import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import EditFormModal from "../modals/EditFormModal";
import BoardsModal from "../modals/BoardsModal";
import AddFormModal from "../modals/AddFormModal";
import "./nav.css";
import AddBoardModal from "../modals/AddBoardModal";
import EditBoardModal from "../modals/EditBoardModal";
import DeleteModal from "../modals/DeleteModal";
import ViewTaskModal from "../modals/ViewTask";
import { ThemeContext } from "../../context/ThemeContext";

const NavDark = () => {
  const {
    loading,
    openModal,
    closeModal,
    selectBoard,
    fetchData,
    fetchBoardsAndColumns,
    data: { boards, selectedBoard, otherData, columns, boardName, modalOpen, modal },
  } = useContext(BoardContext);

  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const handleClickTitle = (e) => {
    e.preventDefault();
    if (modalOpen && modal.id !== "boards__modal") return
    openModal("boards__modal");
  };

  const handleClickAddTask = (e) => {
    e.preventDefault();
    openModal("form__modal--add");
  };

  const handleClickEllipses = () => {
    let element = document.getElementById("ellipses__options");
    if (element.classList.contains("hidden")) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  };

  if (loading) return null;

  return (
    <nav className={`nav ${darkMode ? "bg--dark-grey" : "bg--light"}`}>
      {/* <nav className="nav bg--light"> */}
      <div>
        <img className="logo" src="/assets/logo-mobile.svg" />
        <div onClick={handleClickTitle}>
          <button
            className={`logo__title ${darkMode ? "text--white" : "text--dark"}`}
          >
            {boardName}
            <img id="icon-arrow" src="/assets/icon-chevron-down.svg" />
          </button>
        </div>
      </div>

      {!modalOpen && (
        <div className="header__right">
          <p onClick={handleClickAddTask} className="plus__btn bg--purple">
            +
          </p>
          <div className="icon__ellipses" onClick={handleClickEllipses}>
            <img src="/assets/icon-vertical-ellipsis.svg" />
          </div>

          <div
            id="ellipses__options"
            className={`ellipses__options ${
              darkMode ? "bg--dark" : "bg--light"
            } hidden`}
          >
            <p
              className="text--medium"
              onClick={() => openModal("board__modal--edit")}
            >
              Edit Board
            </p>
            <p className="text--red" onClick={() => openModal("delete__modal")}>
              Delete Board
            </p>
          </div>
        </div>
      )}

      <BoardsModal
        selectedBoard={selectedBoard}
        boards={boards}
        openModal={openModal}
        selectBoard={selectBoard}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <AddFormModal
        closeModal={closeModal}
        columns={columns}
        fetchData={fetchData}
        darkMode={darkMode}
      />
      <EditFormModal
        closeModal={closeModal}
        columns={columns}
        task={otherData}
        darkMode={darkMode}
      />
      <AddBoardModal closeModal={closeModal} selectBoard={selectBoard} darkMode={darkMode}/>
      <EditBoardModal
        closeModal={closeModal}
        boardName={boardName}
        columns={columns}
        modalOpen={modalOpen}
        selectedBoard={selectedBoard}
        fetchBoardsAndColumns={fetchBoardsAndColumns}
        selectBoard={selectBoard}
        darkMode={darkMode}
      />
      <DeleteModal
        closeModal={closeModal}
        selectedBoard={selectedBoard}
        fetchData={fetchBoardsAndColumns}
        darkMode={darkMode}
        boardName={boardName}
      />
      <ViewTaskModal
        closeModal={closeModal}
        task={otherData}
        columns={columns}
        openModal={openModal}
        darkMode={darkMode}
      />
    </nav>
  );
};

export default NavDark;
