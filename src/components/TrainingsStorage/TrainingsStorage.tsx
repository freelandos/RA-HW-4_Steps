import { useRef, useState } from "react";
import { StorageItem } from "./StorageItem";

type Training = {
  date: string;
  distance: number;
};

export function TrainingsStorage() {
  const [trainings, setTrainings] = useState<Training[]>([
    { date: "2024-04-10", distance: 5.7 },
    { date: "2024-04-09", distance: 14.2 },
    { date: "2024-04-08", distance: 3.4 },
  ]);
  const currentDate = useRef<HTMLInputElement>(null);
  const currentKm = useRef<HTMLInputElement>(null);

  function processTrainings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cDate: string | undefined = currentDate.current?.value;
    const cKm: number | undefined = Math.round(Number(currentKm.current?.value) * 10) / 10;
    console.log(cKm);
    
    if (cDate && cKm) {
      setTrainings(updateTrainings(cDate, cKm));
    }
  }

  function updateTrainings(cDate: string, cKm: number) {
    const indexOfCdate = trainings.findIndex((training) => training.date === cDate);

    if (indexOfCdate !== -1) {
      const newTrainings = [...trainings];
      newTrainings[indexOfCdate].distance = Math.round((newTrainings[indexOfCdate].distance + cKm) * 10) / 10;
      return newTrainings;
    } else {
      const newTrainings = [
        ...trainings,
        {
          date: cDate,
          distance: cKm,
        },
      ];
      newTrainings.sort((a, b) => (a.date < b.date ? 1 : -1));
      return newTrainings;
    }
  }

  function removeItem(date: string) {
    setTrainings(() => trainings.filter((training) => training.date !== date));
  }

  return (
    <>
      <form onSubmit={processTrainings}>
        <div className="form_container">
          <div className="form-date">
            <label htmlFor="date">Дата:</label>
            <input
              id="date"
              type="date"
              ref={currentDate}
              required
            />
          </div>
          <div className="form-distance">
            <label htmlFor="distance">Пройдено км:</label>
            <input
              id="distance"
              type="text"
              ref={currentKm}
              required
            />
          </div>
          <button type="submit">OK</button>
        </div>
      </form>
      <div className="table_header">
        <span>Дата:</span>
        <span>Пройдено км:</span>
        <span>Действия:</span>
      </div>
      <div className="table_content">
        {
          trainings.map((training) => (
            <StorageItem
              key={crypto.randomUUID()}
              date={training.date}
              distance={training.distance}
              removeItem={removeItem}
            />
          ))
        }
      </div>
    </>
  );
}
