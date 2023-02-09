import BoardContextProvider from "./context/BoardContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./components/Board";
import "./App.css";
import Nav from "./components/nav";
import ThemeContextProvider from "./context/ThemeContext";

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <BoardContextProvider>
          <Nav />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Board />} />
            </Routes>
          </BrowserRouter>
        </BoardContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
