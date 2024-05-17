import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((res) => setJokes(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <div>full stack app</div>
      <div>{jokes.length}</div>
      {jokes?.map((joke, index) => (
        <>
          <div key={index}>{joke?.name}</div>
        </>
      ))}
    </div>
  );
}

export default App;
