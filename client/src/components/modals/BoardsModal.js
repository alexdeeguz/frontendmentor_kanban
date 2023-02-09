const BoardsModal = ({ selectedBoard, boards, openModal, selectBoard, darkMode, setDarkMode }) => {
  const switchTheme = () => {
    setDarkMode(!darkMode);
    
    if (darkMode) {
      document.getElementById("switch").style.justifyContent = "flex-start";
    } else {
      document.getElementById("switch").style.justifyContent = "flex-end"
    }
  }
  return (
    <div id="boards__modal" className={`boards__modal ${darkMode ? "bg--dark-grey" : "bg--light"}`}>
      <div className="boards__modal-content">
        <h1 className="text--medium">ALL BOARDS</h1>
        {boards?.map((board) => (
          <div
            key={board._id}
            className={`boards__modal--list-item text--medium ${
              selectedBoard === board._id && "selected bg--purple"
            }`}
            onClick={() => selectBoard(board._id)}
          >
            {selectedBoard === board._id ? (
              <img src="/assets/icon-board-white.svg" alt="board icon" />
            ) : (
              <img src="/assets/icon-board.svg" alt="board icon" />
            )}
            <h2>{board.name}</h2>
          </div>
        ))}
        <div
          className="boards__modal--list-item text--main"
          onClick={() => openModal("board__modal--add")}
        >
          <img src="/assets/icon-board-purple.svg" alt="board-icon" />
          <h2>+ Create New Board</h2>
        </div>

        <div className={`toggle-theme__container ${darkMode ? "bg--dark" : "bg--light-grey"}`}>
          <img src="/assets/icon-light-theme.svg" alt="light theme" />
          <div id="switch" className="switch bg--purple" onClick={switchTheme}>
            <div></div>
          </div>
          <img src="/assets/icon-dark-theme.svg" alt="dark theme" />
        </div>
      </div>
    </div>
  );
};

export default BoardsModal;
