import { HTMLField, Field } from '../../types'

const events = [
  'prevButtonClick',
  'nextButtonClick',
  'cancelButtonClick',
  'finishButtonClick'
] as const

type EventType = (typeof events)[number]

class Subscriber {
  type: EventType
  func: () => void
  constructor(type: EventType, subscriberFunc: () => void) {
    this.type = type
    this.func = subscriberFunc
  }
}

abstract class Panel {
  visited: boolean = false
  fields: HTMLField[]
  panelContainer: HTMLDivElement
  panelIndex: number
  subscribers: Subscriber[] = []
  static index: number = 0

  constructor(fields: Field[], panel: HTMLDivElement) {
    this.panelIndex = Panel.index++
    this.panelContainer = panel
    this.fields = fields.map((field: Field) => this.generateHTMLField(field))
    this.generateActionsSection()
  }

  generateHTMLField(field: Field): HTMLField {
    const fieldContainer = document.createElement('div')
    fieldContainer.classList.add('field-container')
    const label = document.createElement('label')
    label.innerText = field.label
    const input = document.createElement('input')
    input.value = field.initialValue
    fieldContainer.appendChild(label)
    fieldContainer.appendChild(input)
    return {
      fieldContainer,
      label,
      input
    }
  }

  show() {
    this.panelContainer.innerHTML = ''

    for (const field of this.fields) {
      this.panelContainer.appendChild(field.fieldContainer)
    }
    this.generateActionsSection()
  }

  subscribeToPanelEvent(event: EventType, subscriberFunc: () => void) {
    this.subscribers.push(new Subscriber(event, subscriberFunc))
  }

  abstract generateActionsSection()

  protected getActionsSectionElem() {
    const actionsSection = document.createElement('div')
    actionsSection.classList.add('actions-section')
    return actionsSection
  }

  protected createCancelButton() {
    const cancelButton = document.createElement('button')
    cancelButton.innerText = 'Відміна'
    cancelButton.addEventListener('click', () => {
      this.subscribers.forEach((subscriber) => {
        if (subscriber.type === 'cancelButtonClick') {
          subscriber.func()
        }
      })
    })
    return cancelButton
  }

  protected createNextButton() {
    const nextButton = document.createElement('button')
    nextButton.innerText = 'Наступна секція'
    nextButton.addEventListener('click', () => {
      this.subscribers.forEach((subscriber) => {
        if (subscriber.type === 'nextButtonClick') {
          subscriber.func()
        }
      })
    })
    return nextButton
  }

  protected createPrevButton() {
    const nextButton = document.createElement('button')
    nextButton.innerText = 'Попередня секція'
    nextButton.addEventListener('click', () => {
      this.subscribers.forEach((subscriber) => {
        if (subscriber.type === 'prevButtonClick') {
          subscriber.func()
        }
      })
    })
    return nextButton
  }
}

export default Panel
