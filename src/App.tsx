import './App.css';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <>
      {/* Контейнер общий обертчный тег для всего содержимого */}
      <div className="container">
        <MainPage></MainPage>
      </div>
    </>
  );
}

export default App;