import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import Workspace from "./pages/Workspace";
import Board from "./pages/Board";

function App() {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path="/" element={<Workspace />} />
        <Route path="/board/:boardId" element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
