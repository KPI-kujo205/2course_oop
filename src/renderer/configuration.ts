import { Config } from './types'

export const config: Config = {
  panels: [
    {
      name: 'Особиста інформація',
      fields: [
        { label: "Ім'я", initialValue: '' },
        { label: 'Прізвище', initialValue: '' },
        { label: 'По-батькові', initialValue: '' },
        { label: 'Вік', initialValue: '18' }
      ]
    },
    {
      name: 'Типу там отаку',
      fields: [
        { label: 'Ну я', initialValue: '' },
        { label: 'Ну ти', initialValue: '' },
        { label: 'Ну ми', initialValue: '' },
        { label: 'Вік', initialValue: '18' },
        { label: 'Пяууууууууууу', initialValue: 'іфвівф' }
      ]
    },
    {
      name: 'Типу там отаку',
      fields: [
        { label: 'Ну я', initialValue: '' },
        { label: 'Ну ти', initialValue: '' },
        { label: 'Ну ми', initialValue: '' },
        { label: 'Вік', initialValue: '18' },
        { label: 'Пяууууууууууу', initialValue: 'іфвівф' }
      ]
    }
  ]
}
