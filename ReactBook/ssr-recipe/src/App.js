import logo from "./logo.svg";
import "./App.css";
import Blue from "./components/Blue";
import Menu from "./components/Menu";
import { Route } from "react-router";

import loadable from "@loadable/component";
const RedPage = loadable(() => import("./pages/RedPage"));

const BluePage = loadable(() => import("./pages/BluePage"));

const UserPage = loadable(() => import("./pages/UsersPage"));
function App() {
  return (
    <div>
      <Menu />
      <hr />
      <Route path="/red" component={RedPage} />

      <Route path="/blue" component={BluePage} />

      <Route path="/users" component={UserPage} />
    </div>
  );
}

export default App;
