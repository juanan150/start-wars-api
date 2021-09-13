import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    axios.get("https://swapi.dev/api/people").then((r) => setInfo(r.data));
  }, []);

  const handleNext = () => {
    axios.get(info.next).then((r) => setInfo(r.data));
  };

  const handlePrevious = () => {
    axios.get(info.previous).then((r) => setInfo(r.data));
  };

  let nextDisable = info.next === null ? true : false;
  let previousDisable = info.previous === null ? true : false;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Wars API</h1>
      </header>
      <section className="results">
        <ul className="list">
          {!!info.results &&
            info.results.map((item) => (
              <li key={item.name}>
                <p>name: {item.name}</p>
                <p>height: {item.height}</p>
                <p>mass: {item.mass}</p>
                <p>hair_color: {item.hair_color}</p>
                <p>skin_color: {item.skin_color}</p>
                <p>eye color: {item.eye_color}</p>
                <p>birth year: {item.birth_year}</p>
                <p>gender: {item.gender}</p>
              </li>
            ))}
        </ul>
      </section>
      <section className="buttons">
        <button disabled={previousDisable} onClick={handlePrevious}>
          Previous
        </button>
        <button disabled={nextDisable} onClick={handleNext}>
          Next
        </button>
      </section>
    </div>
  );
}

export default App;
