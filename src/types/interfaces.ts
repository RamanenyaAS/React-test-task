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