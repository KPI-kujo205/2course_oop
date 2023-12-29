import Panel from './Panel'

class MediumPanel extends Panel {
  generateActionsSection() {
    const actionsSection = this.getActionsSectionElem()
    const nextButton = this.createNextButton()
    const cancelButton = this.createCancelButton()
    const prevButton = this.createPrevButton()
    actionsSection.appendChild(cancelButton)
    actionsSection.appendChild(prevButton)
    actionsSection.appendChild(nextButton)
    this.panelContainer.appendChild(actionsSection)
  }
}

export default MediumPanel
