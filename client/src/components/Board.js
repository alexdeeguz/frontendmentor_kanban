import { useContext } from "react";

import { BoardContext } from "../context/BoardContext";
import { ThemeContext } from "../context/ThemeContext";
import Overlay from "./Overlay";
import Column from "./partials/column/Column";

const Home = () => {
  const {
    data,
    openModal,
    closeModal,
    selectTask
  } = useContext(BoardContext);

  const { darkMode } = useContext(ThemeContext)

  return (
    <div className={`home ${darkMode ? "bg--dark" : "bg--light-grey"}`}>
      <div>
        <Overlay closeModal={closeModal}/>
        <div>

        {data.columns?.map((column) => (
          <Column key={column._id} column={column} openModal={openModal} selectTask={selectTask} data={data} darkMode={darkMode}/>
        ))}
        </div>
        {/* <Overlay /> */}
      </div>
    </div>
  );
};

export default Home;
