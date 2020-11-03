import React from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = React.useState([]);

  //Initial LOAD for all backend elements.
  React.useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  //ADD element to the backend.
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Title-${Date.now()}`,
      url: "urlTest",
      techs: ["tech1", "thec2", "tech3"],
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    // FORMA 1 - USANDO SPLICE
    // const newArray = [...repositories];
    // newArray.splice(
    //   repositories.findIndex((rep) => rep.id === id),
    //   1
    // );
    // setRepositories(newArray);

    // FORMA 2 - USANDO FILTER
    setRepositories(repositories.filter((rep) => rep.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((rep) => (
          <li key={rep.id}>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
