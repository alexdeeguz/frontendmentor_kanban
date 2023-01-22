import { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import "./nav.css";

const NavDark = () => {
  const {
    openModal,
    data: { boards, selectedBoard },
  } = useContext(BoardContext);

  const handleClickTitle = () => {
    openModal("boards__modal");
    // let arrow = document.getElementById("icon-arrow")
    // arrow.style.transform = "rotate(180deg)"
  };
  return (
    <nav className="nav bg--dark-grey">
      <div>
        <img className="logo" src="/assets/logo-mobile.svg" />
        <div onClick={handleClickTitle}>
          <button className="logo__title text--dark">
            Platform Launch
            <img id="icon-arrow" src="/assets/icon-chevron-down.svg" />
          </button>
        </div>
      </div>

      <div>
        <p className="plus__btn bg--purple">+</p>
        <button>
          <img src="/assets/icon-vertical-ellipsis.svg" />
        </button>
      </div>

      <div id="boards__modal" className="boards__modal">
        <div className="boards__modal-content">
          <h1 className="text--medium">ALL BOARDS</h1>
          {boards?.map((board) => (
            <div
              key={board._id}
              className={`boards__modal--list-item text--medium ${selectedBoard === board._id && "selected bg--purple"}`}
            >
              {selectedBoard === board._id ? <img src="/assets/icon-board-white.svg" alt="board icon"/> : <img src="/assets/icon-board.svg" alt="board icon" />}
              <h2>{board.name}</h2>
            </div>
          ))}
          <div className="boards__modal--list-item text--main">
            <img src="/assets/icon-board-purple.svg" alt="board-icon" />
            <h2>+ Create New Board</h2>
          </div>

          <div className="toggle-theme__container bg--dark">
            <img src="/assets/icon-light-theme.svg" alt="light theme" />
            <div className="switch bg--purple">
              <div></div>
            </div>
            <img src="/assets/icon-dark-theme.svg" alt="dark theme" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavDark;
