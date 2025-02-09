import "./MainPage.css";
import { useDispatch, useSelector } from "react-redux";
import { IInitialState } from "../../types/interfaces";
import { useEffect } from "react";
import { fetchSeminars } from "../../slice/slice";
import Seminar from "../../components/Seminar/Seminar";
import Loader from "../../components/Loader/Loader";
import ErrorImage from "../../images/error.svg";

function MainPage() {

  // dispatch для отправки действий 
  const dispatch = useDispatch()<any>;

  // получаем данные о семинарах полученных с API
  const seminars = useSelector((state: IInitialState) => state.seminars);
  const status = useSelector((state: IInitialState) => state.status);
  const error = useSelector((state: IInitialState) => state.error);

  // useEffect для загрузки семинаров
  useEffect(() => {
    dispatch(fetchSeminars());
  }, []);

  return (
    <>
    {/* обработка состояния ожидания. отображаю лоадер */}
      {status === "pending" ?
        <>
          <Loader></Loader>
        </> : null}
        {/* в случае успешного ответа отрисовываем семинары */}
      {status === "fulfilled" ?
        <>
          {seminars.map((seminar) => (
            <Seminar key={seminar.id} seminar={seminar} />
          ))}
        </> : null}
        {/* в случае ошибки отображаем изоброжение и текст ошибки */}
      {status === "rejected" ?
        <>
          <div className="error-container">
            <img className="error-container__image" src={ErrorImage} alt="Error image" />
            <div className="error-container__message">
              Произошла ошибка: {error || "Неизвестная ошибка"}
            </div>
          </div>
        </> : null}
    </>
  );
}

export default MainPage;