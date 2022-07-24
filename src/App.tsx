import { Menu } from "@headlessui/react";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";
import Workspace from "./pages/Workspace";

function App() {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path="/" element={<Workspace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
