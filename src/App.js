import Accounting from "./component/Accounting";
import CreditList from "./component/CreditList";
import DebitList from "./component/DebitList";
import Header from "./component/Header";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Accounting />
      <div className="d-flex justify-content-around">
        <CreditList />
        <DebitList />
      </div>
    </div>
  );
}

export default App;
