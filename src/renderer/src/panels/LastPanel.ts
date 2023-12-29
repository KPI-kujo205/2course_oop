import Panel from './Panel'

class LastPanel extends Panel {
  generateActionsSection() {
    const actionsSection = this.getActionsSectionElem()
    const finishButton = this.createFinishFormButton()
    const cancelButton = this.createCancelButton()
    const prevButton = this.createPrevButton()

    actionsSection.appendChild(cancelButton)
    actionsSection.appendChild(prevButton)
    actionsSection.appendChild(finishButton)
    this.panelContainer.appendChild(actionsSection)
  }

  protected createFinishFormButton() {
    const finishButton = document.createElement('button')
    finishButton.innerText = 'Закінчити форму'
    finishButton.addEventListener('click', () => {
      this.subscribers.forEach((subscriber) => {
        if (subscriber.type === 'finishButtonClick') {
          subscriber.func()
        }
      })
    })
    return finishButton
  }
}

export default LastPanel
