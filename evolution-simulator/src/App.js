import SimState from "./context/SimState";
import Sim from "./Sim";
import "./style.css";
function App() {
  return (
    <SimState>
      <div className="App">
        <Sim />
      </div>
    </SimState>
  );
}

export default App;
