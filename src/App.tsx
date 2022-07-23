import { Menu } from "@headlessui/react";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import Board from "./pages/Board";

function App() {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path="/" element={<Board />}></Route>
      </Routes>
    </div>
  );
}

export default App;
