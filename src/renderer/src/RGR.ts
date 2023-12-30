import Panel from './panels/Panel'
import InitialPanel from './panels/InitialPanel'
import MediumPanel from './panels/MediumPanel'
import LastPanel from './panels/LastPanel'
import { Config, TPanelResult } from '../types'

class RGR {
  panels: Panel[] = []
  currentPanel!: Panel
  constructor() {
    this.configureStartButtons()
  }
  private createPanels() {
    const panelContainer = document.querySelector('.form-container') as HTMLDivElement
    const config: Config = window.api.readConfig()

    const panelsNumber = config.panels.length

    for (let i = 0; i < panelsNumber; i++) {
      let panel: Panel
      switch (i) {
        case panelsNumber - 1:
          panel = new LastPanel(config.panels[i], panelContainer, i)
          break
        case 0:
          panel = new InitialPanel(config.panels[i], panelContainer, i)
          break
        default:
          panel = new MediumPanel(config.panels[i], panelContainer, i)
      }

      panel.subscribeToPanelEvent('nextButtonClick', this.handleNextButtonClick.bind(this))
      panel.subscribeToPanelEvent('prevButtonClick', this.handlePrevButtonClick.bind(this))
      panel.subscribeToPanelEvent('finishButtonClick', this.handleFinishButtonClick.bind(this))
      panel.subscribeToPanelEvent('cancelButtonClick', this.handleCancelButtonClick.bind(this))
      this.panels.push(panel)
    }
  }

  handleNextButtonClick() {
    this.handlePanelChange(this.currentPanel.panelIndex + 1)
  }
  handlePrevButtonClick() {
    this.handlePanelChange(this.currentPanel.panelIndex - 1)
  }

  handleFinishButtonClick() {
    const panelContainer = document.querySelector('.form-with-stepper') as HTMLDivElement
    const resultsSection = document.querySelector('.final-container') as HTMLDivElement
    const resultsContainer = resultsSection.querySelector('.form-results') as HTMLParagraphElement

    panelContainer.classList.add('hide')
    resultsSection.classList.remove('hide')

    const results = this.assembleResults()
    this.saveResultsToFile(results)
    resultsContainer.innerHTML = JSON.stringify(results, null, 2)
  }

  saveResultsToFile(results: TPanelResult[]) {
    window.electron.ipcRenderer.send('saveResultsToFile', results)
  }

  assembleResults(): TPanelResult[] {
    const results: TPanelResult[] = []
    for (const panel of this.panels) {
      const panelResult: TPanelResult = {
        name: panel.name,
        fields: []
      }
      for (const field of panel.fields) {
        panelResult.fields.push({ label: field.label.innerText, value: field.input.value })
      }
      results.push(panelResult)
    }
    return results
  }
  handleCancelButtonClick() {
    const landingSection = document.querySelector('.initial-container') as HTMLDivElement
    const panelContainer = document.querySelector('.form-with-stepper') as HTMLDivElement

    landingSection.classList.remove('hide')
    panelContainer.classList.add('hide')
  }

  handlePanelChange(index: number) {
    this.currentPanel = this.panels[index]
    this.currentPanel.visited = true
    this.currentPanel.show()

    const panelTitle = document.querySelector('.panel-title') as HTMLHeadingElement
    panelTitle.innerHTML = this.currentPanel.name

    this.repaintStepper()
  }

  private repaintStepper() {
    const stepper = document.querySelector('.stepper') as HTMLDivElement
    stepper.innerHTML = ''
    for (const panel of this.panels) {
      const circle = document.createElement('div')
      circle.innerHTML = `${panel.panelIndex + 1}`
      circle.classList.add('circle')
      circle.addEventListener('click', () => this.handlePanelChange(panel.panelIndex))
      if (panel.visited) {
        circle.classList.add('visited')
      }
      if (panel.panelIndex === this.currentPanel.panelIndex) {
        circle.classList.add('active')
      }
      stepper.appendChild(circle)
    }
  }

  private configureStartButtons() {
    const startButtons = document.querySelectorAll<HTMLButtonElement>('.start-btn')
    const landingSection = document.querySelector('.initial-container') as HTMLDivElement
    const panelContainer = document.querySelector('.form-with-stepper') as HTMLDivElement
    const finalSection = document.querySelector('.final-container') as HTMLDivElement

    for (const btn of startButtons) {
      btn.addEventListener('click', () => {
        landingSection.classList.add('hide')
        finalSection.classList.add('hide')
        panelContainer.classList.remove('hide')
        this.panels = []
        this.createPanels()
        this.handlePanelChange(0)
        this.currentPanel.show()
      })
    }
  }
}

export default new RGR()
