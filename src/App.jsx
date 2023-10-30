import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <Link to={"/kyselyt"}>Kyselyt</Link>
        <Link to={"/lisaaKysely"}>Lisää kysely</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
