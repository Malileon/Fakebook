import "./App.css";
import Appbar from "./components/Appbar";
import AuthContent from "./components/AuthContent";
import User from "./components/User";
import LoginForm from "./forms/LoginForm";
import AppContent from "./components/AppContent";
// import TestForm from "./forms/TestForm";

function App() {
  return (
    <div className="App">
      <Appbar />
      {/* <User/> */}
      <LoginForm />
      {/* <AppContent /> */}
      {/* <TestForm /> */}
      {/* <AuthContent/> */}
    </div>
  );
}

export default App;
