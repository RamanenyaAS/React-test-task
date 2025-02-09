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
  value?: string
}

export interface IButton {
  text: string,
  type: string,
  onClick: () => void
}