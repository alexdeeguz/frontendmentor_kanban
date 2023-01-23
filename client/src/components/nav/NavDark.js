import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import EditFormModal from "../modals/EditFormModal";
import BoardsModal from "../modals/BoardsModal";
import AddFormModal from "../modals/AddFormModal";
import "./nav.css";
import AddBoardModal from "../modals/AddBoardModal";
import EditBoardModal from "../modals/EditBoardModal";
import DeleteModal from "../modals/DeleteModal";

const NavDark = () => {
  const {
    openModal,
    closeModal,
    data: { boards, selectedBoard },
  } = useContext(BoardContext);

  const handleClickTitle = () => {
    openModal("boards__modal");
  };

  const handleClickAddTask = () => {
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
  return (
    <nav className="nav bg--dark-grey">
      <div>
        <img className="logo" src="/assets/logo-mobile.svg" />
        <div onClick={handleClickTitle}>
          <button className="logo__title text--white">
            Platform Launch
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
          <p className="text--red" onClick={() => openModal("delete__modal")}>Delete Board</p>
        </div>
      </div>

      <BoardsModal
        selectedBoard={selectedBoard}
        boards={boards}
        openModal={openModal}
      />
      <AddFormModal closeModal={closeModal} />
      <EditFormModal closeModal={closeModal} />
      <AddBoardModal closeModal={closeModal} />
      <EditBoardModal closeModal={closeModal} />
      <DeleteModal closeModal={closeModal} />
    </nav>
  );
};

export default NavDark;
