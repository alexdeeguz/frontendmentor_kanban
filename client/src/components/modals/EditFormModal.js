const EditFormModal = () => {
  return (
    <div id="form__modal--edit" className="form__modal">
      <form className="form__modal-content bg--dark-grey">
        <h1>Edit Task</h1>
        <label>
          Title
          <input type="text" />
        </label>

        <label>
          Description
          <textarea type="text" />
        </label>

        <label>
          Subtasks
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
              + Add New Subtask
            </button>
          </div>
        </label>

        <label>
          Status
          <select>
            <option>Todo</option>
          </select>
          <div id="add-task__button--bottom" className="btn-container">
            <button className="btn bg--purple text--white">
              Save Changes
            </button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default EditFormModal;
