import { useDispatch } from "react-redux";
import { ISeminar } from "../../types/interfaces";
import './Seminar.css'
import { deleteSeminar } from "../../slice/slice";
import { useState } from "react";
import EditSeminarModal from "../EditSeminarModal/EditSeminarModal";

function Seminar({ seminar }: { seminar: ISeminar }) {

  const dispatch = useDispatch()<any>;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  }

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
              <button className="right-block__button right-block__button_edit" onClick={handleEditClick}>{"Edit"}</button>
              <button className="right-block__button right-block__button_delete" onClick={handleDelClick}>{"Delete"}</button>
            </div>
          </div>
        </div>
      </div>
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