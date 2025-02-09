import "./Seminar.css";
import { useDispatch } from "react-redux";
import { ISeminar } from "../../types/interfaces";
import { deleteSeminar } from "../../slice/slice";
import { useState } from "react";
import EditSeminarModal from "../EditSeminarModal/EditSeminarModal";
import Button from "../Button/Button";

function Seminar({ seminar }: { seminar: ISeminar }) {

  // dispatch для отправки действий 
  const dispatch = useDispatch()<any>;

  // Состояние для отслеживания открыто ли модальное окно
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функция для открытия модального окна редактирования семинара
  const handleEditClick = () => {
    setIsModalOpen(true);
  }

  // Функция для удаления семинара с подтверждение через window.confirm встроенный в бразуер
  const handleDelClick = () => {
    const isConfirmed = window.confirm("Вы уверены, что хотите удалить семинар?");
    if (isConfirmed) {
      dispatch(deleteSeminar(seminar.id));
    }
  }

  return (
    <>
      <div className="seminar-container">
        <div className="seminar-block">
          <div className="seminar-left">
            <img className="seminar-left__img" src={seminar.photo} alt="seminar preview image" />
            <div className="left-block">
              <div className="left-block__date"> {seminar.date}</div>
              <div className="left-bloke__time">{seminar.time}</div>
            </div>
          </div>
          <div className="seminar-right">
            <div className="seminar-right__title">{seminar.title}</div>
            <div className="seminar-right__description">{seminar.description}</div>
            <div className="right-block">
              <Button type="right-block__button right-block__button_edit" onClick={handleEditClick} text="Edit"></Button>
              <Button type="right-block__button right-block__button_delete" onClick={handleDelClick} text="Delete"></Button>
            </div>
          </div>
        </div>
      </div>
      {/* Отображаем модальное окно если оно открыто */}
      {isModalOpen && (
        <EditSeminarModal
          seminar={seminar}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default Seminar;