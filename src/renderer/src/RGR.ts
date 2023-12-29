import Panel from './panels/Panel'
import InitialPanel from './panels/InitialPanel'
import MediumPanel from './panels/MediumPanel'
import LastPanel from './panels/LastPanel'

import { config } from '../configuration'
class RGR {
  panels: Panel[] = []
  currentPanel: Panel
  constructor() {
    this.createPanels()
    this.currentPanel = this.panels[0]
    this.currentPanel.show()
  }
  private createPanels() {
    const panelContainer = document.querySelector('.form-container') as HTMLDivElement
    const panelsNumber = config.panels.length

    for (let i = 0; i < panelsNumber; i++) {
      let panel: Panel
      switch (i) {
        case panelsNumber - 1:
          panel = new LastPanel(config.panels[i].fields, panelContainer)
          break
        case 0:
          panel = new InitialPanel(config.panels[i].fields, panelContainer)
          break
        default:
          panel = new MediumPanel(config.panels[i].fields, panelContainer)
      }

      panel.subscribeToPanelEvent('nextButtonClick', this.handleNextButtonClick.bind(this))
      panel.subscribeToPanelEvent('prevButtonClick', this.handlePrevButtonClick.bind(this))
      panel.subscribeToPanelEvent('finishButtonClick', this.handleFinishButtonClick.bind(this))
      panel.subscribeToPanelEvent('cancelButtonClick', this.handleCancelButtonClick.bind(this))
      this.panels.push(panel)
    }
  }

  handleNextButtonClick() {
    this.handleButtonChange(this.currentPanel.panelIndex + 1)
  }
  handlePrevButtonClick() {
    this.handleButtonChange(this.currentPanel.panelIndex - 1)
  }
  handleButtonChange(index: number) {
    this.currentPanel = this.panels[index]
    this.currentPanel.visited = true
    this.currentPanel.show()
  }
  handleFinishButtonClick() {
    console.log('finishing', this.panels)
  }
  handleCancelButtonClick() {
    console.log('canceling')
  }
}

export default new RGR()
