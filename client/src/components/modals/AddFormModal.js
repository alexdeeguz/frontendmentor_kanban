const AddFormModal = () => {
    return (
      <div id="form__modal--add" className="form__modal">
        <form className="form__modal-content bg--dark-grey">
          <h1>Add New Task</h1>
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
                Create Task
              </button>
            </div>
          </label>
        </form>
      </div>
    );
}

export default AddFormModal