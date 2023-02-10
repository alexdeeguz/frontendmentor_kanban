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

    const handleClickAddBoard = (e) => {
      e.preventDefault();
      openModal("board__modal--edit");
    };

  if (data?.columns) {
    if (!data.columns.length) {
      return (
        <div className={`empty-message ${darkMode ? "bg--dark" : "bg--light-grey"}`}>

            <Overlay closeModal={closeModal} />
            <div>
              <h1 className={darkMode ? "text--white" : "text--medium"}>This board is empty. Create a new column to get started</h1>
              <button
                id="add-board-btn" className="btn bg--purple text--white"
                onClick={handleClickAddBoard}
              >
                +Add New Board
              </button>
            </div>
        </div>
      );

    }
  }
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
