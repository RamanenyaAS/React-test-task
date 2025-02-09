import "./Button.css";
import { IButton } from "../../types/interfaces";

function Button({ text, type, onClick }: IButton) {

  return (
    <>
      <button className={type} onClick={onClick}>{text}</button>
    </>
  );
}

export default Button;