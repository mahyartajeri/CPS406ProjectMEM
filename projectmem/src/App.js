import "./App.css";
import MainMenu from "./components/MainMenu";

function App() {
  function loginFunc(e) {
    e.preventDefault();
    alert("new member logged in!");
  }

  return (
    <div className="App">
      <MainMenu loginFunc={loginFunc}></MainMenu>
    </div>
  );
}

export default App;
