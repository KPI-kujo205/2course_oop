import Panel from './panels/Panel'
import InitialPanel from './panels/InitialPanel'
import MediumPanel from './panels/MediumPanel'
import LastPanel from './panels/LastPanel'

import { config } from '../configuration'
class RGR {
  panels: Panel[] = []
  currentPanel!: Panel
  constructor() {
    this.createPanels()
    this.handlePanelChange(0)
    this.currentPanel.show()
  }
  private createPanels() {
    const panelContainer = document.querySelector('.form-container') as HTMLDivElement
    const panelsNumber = config.panels.length

    for (let i = 0; i < panelsNumber; i++) {
      let panel: Panel
      switch (i) {
        case panelsNumber - 1:
          panel = new LastPanel(config.panels[i], panelContainer)
          break
        case 0:
          panel = new InitialPanel(config.panels[i], panelContainer)
          break
        default:
          panel = new MediumPanel(config.panels[i], panelContainer)
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
  handleFinishButtonClick() {
    const panelContainer = document.querySelector('.form-with-stepper') as HTMLDivElement
    panelContainer.classList.add('hide')
    console.log('finishing', this.panels)
  }
  handleCancelButtonClick() {
    console.log('canceling')
  }
}

export default new RGR()
