import { IButton } from "../../types/interfaces";
import './Button.css'

function Button({ text, type, onClick }: IButton) {

  return (
    <>
      <button className={type} onClick={onClick}>{text}</button>
    </>
  );
}

export default Button;