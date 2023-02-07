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

const NavDark = () => {
  const {
    loading,
    openModal,
    closeModal,
    selectBoard,
    fetchData,
    fetchBoardsAndColumns,
    data: { boards, selectedBoard, otherData, columns, boardName, modalOpen },
  } = useContext(BoardContext);

  const handleClickTitle = (e) => {
    e.preventDefault();
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

  if (loading) return null

  return (
    <nav className="nav bg--dark-grey">
      <div>
        <img className="logo" src="/assets/logo-mobile.svg" />
        <div onClick={handleClickTitle}>
          <button className="logo__title text--white">
            {boards?.find((board) => board._id === selectedBoard) ? boards?.find((board) => board._id === selectedBoard).name : ""}
            <img id="icon-arrow" src="/assets/icon-chevron-down.svg" />
          </button>
        </div>
      </div>

      <div className="header__right">
        <p onClick={handleClickAddTask} className="plus__btn bg--purple">
          +
        </p>
        <div className="icon__ellipses" onClick={handleClickEllipses}>
          <img src="/assets/icon-vertical-ellipsis.svg" />
        </div>

        <div
          id="ellipses__options"
          className="ellipses__options bg--dark hidden"
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

      <BoardsModal
        selectedBoard={selectedBoard}
        boards={boards}
        openModal={openModal}
        selectBoard={selectBoard}
      />
      <AddFormModal closeModal={closeModal} />
      <EditFormModal closeModal={closeModal} />
      <AddBoardModal closeModal={closeModal} />
      <EditBoardModal
        closeModal={closeModal}
        boardName={boardName}
        columns={columns}
        modalOpen={modalOpen}
        selectedBoard={selectedBoard}
        fetchBoardsAndColumns={fetchBoardsAndColumns}
      />
      <DeleteModal closeModal={closeModal} selectedBoard={selectedBoard} fetchData={fetchBoardsAndColumns}/>
      <ViewTaskModal
        closeModal={closeModal}
        task={otherData}
        columns={columns}
        fetchData={fetchData}
      />
    </nav>
  );
};

export default NavDark;
