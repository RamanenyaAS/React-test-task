export interface ISeminar {
  id: number,
  title: string,
  description: string,
  date: string,
  time: string,
  photo: string,
}

export interface IInitialState {
  seminars: [] | ISeminar[],
  status: null | string,
  error: null | string,
}

export interface IInput {
  title: string,
  type: string,
  placeholder: string,
  onChange: (event: any) => void,
  value?: string // Сделал необязательным т.к. при каждом открытии редактирования в консоль летели варнинги из-за поля Date
}

export interface IButton {
  text: string,
  type: string,
  onClick: () => void
}