export type Config = {
  panels: Panel[]
}

type Panel = {
  name: string
  fields: Field[]
}

export type Field = {
  label: string
  initialValue: string
}

export type HTMLField={
  fieldContainer: HTMLDivElement
  label: HTMLLabelElement
  input: HTMLInputElement
}
