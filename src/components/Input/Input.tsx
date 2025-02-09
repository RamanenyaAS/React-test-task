import './Input.css'
import { IInput } from '../../types/interfaces';

function Input({ title, type, placeholder, onChange, value }: IInput) {

  return (
    <>
      <div className="input__title">{title}</div>
      <input className="input" type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </>
  );
}

export default Input;