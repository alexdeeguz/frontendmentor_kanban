const AddBoardModal = ({ closeModal }) => {
  return (
    <div id="board__modal--add" className="form__modal" onClick={closeModal}>
      <form className="form__modal-content bg--dark-grey">
        <h1>Add New Board</h1>
        <label>
          Board Name
          <input type="text" />
        </label>

        <label>
          Board Columns
          <div className="subtask">
            <input type="text" />
            <img src="/assets/icon-cross.svg" />
          </div>
          <div className="subtask">
            <input type="text" />
            <img src="/assets/icon-cross.svg" />
          </div>
          <div id="add-task__button" className="btn-container">
            <button className="btn bg--white text--main">
              + Add New Column
            </button>
          </div>
        </label>


          <div id="add-task__button--bottom" className="btn-container">
            <button className="btn bg--purple text--white">Create New Board</button>
          </div>
      </form>
    </div>
  );
};

export default AddBoardModal;
