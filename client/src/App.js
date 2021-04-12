import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Store from "./Contexts/Store";

//pull code from URL after redirect from Spotify API
const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return <Store>{code ? <Dashboard code={code} /> : <Login />}</Store>;
}

export default App;
