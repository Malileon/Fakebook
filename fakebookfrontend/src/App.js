import "./App.css";
import Appbar from "./components/Appbar";
// import AuthContent from "./components/AuthContent";
import User from "./components/User";
import LoginForm from "./forms/LoginForm";

function App() {
  return (
    <div className="App">
      <Appbar />
      {/* <User/> */}
      <LoginForm />
      {/* <AuthContent/> */}
    </div>
  );
}

export default App;
