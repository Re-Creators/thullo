import { Menu } from "@headlessui/react";
import TopBar from "./components/TopBar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route
          path="/"
          element={
            <Menu>
              <Menu.Button>More</Menu.Button>
              <Menu.Items>
                <Menu.Item disabled>
                  <span className="opacity-75">
                    Invite a friend (coming soon!)
                  </span>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
