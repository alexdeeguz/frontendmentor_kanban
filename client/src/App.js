import BoardContextProvider from "./context/BoardContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./components/Board";
import "./App.css";
import Nav from "./components/nav";

function App() {
  return (
    <div className="App">
      <BoardContextProvider>
        <Nav />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Board />} />
          </Routes>
        </BrowserRouter>
      </BoardContextProvider>
    </div>
  );
}

export default App;
