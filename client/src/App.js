import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./components/Board";
import "./App.css";
import Nav from "./components/nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/boards/:id" element={<Board />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
