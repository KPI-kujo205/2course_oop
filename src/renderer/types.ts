export type Config = {
  panels: Panel[]
}

export type Panel = {
  name: string
  fields: Field[]
}

type TResultField = {
  label: string
  value: string
}

export type TPanelResult = {
  name: string
  fields: TResultField[]
}

export type Field = {
  label: string
  initialValue: string
}

export type HTMLField = {
  fieldContainer: HTMLDivElement
  label: HTMLLabelElement
  input: HTMLInputElement
}
