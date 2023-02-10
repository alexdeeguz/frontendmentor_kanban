import { deleteBoard } from "../../actions/boards";

const DeleteModal = ({ closeModal, selectedBoard, fetchData, darkMode, boardName }) => {
  const handleClickDelete = () => {
    localStorage.removeItem("board");
    deleteBoard(selectedBoard)
      .then(() => fetchData())
  };

  return (
    <div
      id="delete__modal"
      className={`form__modal ${darkMode ? "text--white" : "text--dark"}`}
    >
      <div
        className={`form__modal-content ${
          darkMode ? "bg--dark-grey" : "bg--white"
        }`}
      >
        <h1 className="text--red">Delete this board?</h1>
        <p className="text--medium">
          Are you sure you want to delete the '{boardName}' board? This action
          will remove all columns and tasks and cannot be reversed.
        </p>

        <div>
          <div className="btn-container">
            <button
              className="btn bg--red text--white"
              onClick={handleClickDelete}
            >
              Delete
            </button>
          </div>
          <br/>
          <div className="btn-container">
            <button className="btn bg--white text--main" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
