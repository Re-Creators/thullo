import "./App.css";
import { Menu } from "@headlessui/react";

function App() {
  return (
    <div>
      <h1 className="text-red-500">Hello</h1>
      <Menu>
        <Menu.Button>More</Menu.Button>
        <Menu.Items>
          <Menu.Item disabled>
            <span className="opacity-75">Invite a friend (coming soon!)</span>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default App;
