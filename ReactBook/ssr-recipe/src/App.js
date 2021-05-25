import logo from "./logo.svg";
import "./App.css";
import Blue from "./components/Blue";
import Menu from "./components/Menu";
import { Route } from "react-router";
import Red from "./components/Red";
import RedPage from "./pages/RedPage";
import BluePage from "./pages/BluePage";
import UserPage from "./pages/UsersPage";

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
