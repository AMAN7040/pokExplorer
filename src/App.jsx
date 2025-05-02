import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PokemonList } from "./features/pokemon/components/PokemonList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
    </Routes>
  );
}

export default App;
