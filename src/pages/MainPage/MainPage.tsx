import { useDispatch, useSelector } from "react-redux";
import { IInitialState } from "../../types/interfaces";
import { useEffect } from "react";
import { fetchSeminars } from "../../slice/slice";
import './MainPage.css'
import Seminar from "../../components/Seminar/Seminar";
import Loader from "../../components/Loader/Loader";
import ErrorImage from "../../images/error.svg"

function MainPage() {

  const dispatch = useDispatch()<any>;
  const seminars = useSelector((state: IInitialState) => state.seminars);
  const status = useSelector((state: IInitialState) => state.status);
  const error = useSelector((state: IInitialState) => state.error);

  useEffect(() => {
    dispatch(fetchSeminars());
  }, []);


  return (
    <>
      {status === "pending" ?
        <>
          <Loader></Loader>
        </> : null}
      {status === "fulfilled" ?
        <>
          {seminars.map((seminar) => (
            <Seminar key={seminar.id} seminar={seminar} />
          ))}
        </> : null}
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