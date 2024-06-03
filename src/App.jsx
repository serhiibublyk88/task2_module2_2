import  { useState } from "react";
import styles from "./App.module.css";
import data from "./data.json";

export const App = () => {
  const [steps] = useState(data || []);
  const [activeIndex, setActiveIndex] = useState(0);

  const isFirstStep = activeIndex === 0;
  const isLastStep = activeIndex === steps.length - 1;

  const handlePrevClick = () => {
    if (!isFirstStep) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastStep) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleReset = () => {
    setActiveIndex(0);
  };

  const handleStepClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {steps.length > 0
              ? steps[activeIndex].content
              : "Нет шагов для отображения"}
          </div>
          <ul className={styles["steps-list"]}>
            {steps.map((step, index) => (
              <li
                key={index}
                className={`${styles["steps-item"]} ${
                  index <= activeIndex ? styles.done : ""
                } ${index === activeIndex ? styles.active : ""}`}
              >
                <button
                  className={styles["steps-item-button"]}
                  onClick={() => handleStepClick(index)}
                >
                  {index + 1}
                </button>
                Шаг {index + 1}
              </li>
            ))}
          </ul>
          <div className={styles["buttons-container"]}>
            <button
              className={styles.button}
              onClick={handlePrevClick}
              disabled={isFirstStep}
            >
              Назад
            </button>
            <button
              className={styles.button}
              onClick={isLastStep ? handleReset : handleNextClick}
            >
              {isLastStep ? "Начать сначала" : "Далее"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
