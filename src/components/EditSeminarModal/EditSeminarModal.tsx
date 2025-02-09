import { useState } from "react";
import { editSeminar, fetchSeminars } from "../../slice/slice";
import "./EditSeminarModal.css";
import { ISeminar } from "../../types/interfaces";
import { useDispatch } from "react-redux";
import Input from "../Input/Input";
import Button from "../Button/Button";

function EditSeminarModal({ seminar, onClose }: { seminar: ISeminar, onClose: () => void }) {

  const dispatch = useDispatch()<any>;
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);
  const [date, setDate] = useState(seminar.date);
  const [photo, setPhoto] = useState(seminar.photo);
  const [time, setTime] = useState(seminar.time);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = async () => {
    const updatedSeminar: ISeminar = {
      ...seminar,
      title,
      description,
      date,
      photo,
      time
    };
    try {
      await dispatch(editSeminar(updatedSeminar)).unwrap();
      await dispatch(fetchSeminars()); // Обновляем список семинаров после редактирования
    } catch (error) {
      console.error("Ошибка при редактировании:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-container">
          <h2>Edit Seminar</h2>
          <Input title="Title" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} ></Input>
          <div className="textarea__title">{"Description"}</div>
          <textarea
            className="modal-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input title="Date" type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} ></Input>
          <Input title="Time" type="time" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} ></Input>
          <Input title="Photo URL" type="text" placeholder="Photo URL" value={photo} onChange={(e) => setPhoto(e.target.value)} ></Input>
          <div className="modal-buttons">
            <Button type="button button_save" onClick={handleSave} text="Save"></Button>
            <Button type="button button_cancel" onClick={onClose} text="Cancel"></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSeminarModal;