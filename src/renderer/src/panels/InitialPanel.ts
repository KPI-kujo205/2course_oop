import Panel from './Panel'

class InitialPanel extends Panel {
  generateActionsSection() {
    const actionsSection = this.getActionsSectionElem()
    const nextButton = this.createNextButton()
    const cancelButton = this.createCancelButton()

    actionsSection.appendChild(cancelButton)
    actionsSection.appendChild(nextButton)
    this.panelContainer.appendChild(actionsSection)
  }
}

export default InitialPanel
