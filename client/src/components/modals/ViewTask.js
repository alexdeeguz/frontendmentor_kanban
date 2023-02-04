import { useEffect, useState } from "react";
import { updateTask } from "../../actions/tasks";

const ViewTaskModal = ({ task, columns, fetchData }) => {
  let completedTasks = task?.subtasks.filter((task) => task.isCompleted).length;
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => {
    setUpdatedTask(task);
  }, [task, columns]);

  const handleClickSave = (e) => {
    e.preventDefault();
    
    updateTask(updatedTask._id, updatedTask)
      .then(() => fetchData())
  };

  const handleUpdate = (id) => {
    let subtasksList = [];
    let taskToUpdate = updatedTask?.subtasks.find((el) => id === el._id);

    updatedTask?.subtasks.forEach((subtask) =>
      subtask._id === taskToUpdate._id
        ? subtasksList.push({
            ...taskToUpdate,
            isCompleted: !taskToUpdate.isCompleted,
          })
        : subtasksList.push(subtask)
    );
    let taskk = {
      ...updatedTask,
      subtasks: subtasksList,
    };
    setUpdatedTask(taskk);
  };

  const handleUpdateColumn = (e) => {
    let taskk = {
      ...updatedTask,
      status: e.target.value,
    };
    setUpdatedTask(taskk);
  };

  return (
    <div id="form__modal--view" className="form__modal">
      <form className="form__modal-content bg--dark-grey">
        <h1>{updatedTask?.title}</h1>
        <p className="text--medium">{updatedTask?.description}</p>

        <p>
          Subtasks ({completedTasks} of {updatedTask?.subtasks.length})
        </p>

        {updatedTask?.subtasks
          ?.sort((a, b) => b.title - a.title)
          .map((subtask) => (
            <div
              key={subtask._id}
              className="subtask-checkbox bg--dark"
              onClick={() => handleUpdate(subtask._id)}
            >
              <input
                type="checkbox"
                checked={subtask.isCompleted}
                onChange={() => handleUpdate(subtask._id)}
              />
              <span data-completed={subtask.isCompleted}>{subtask.title}</span>
            </div>
          ))}

        <label>
          Current Status
          <select onChange={handleUpdateColumn}>
            {columns?.map((column) => (
              <option
                selected={updatedTask?.status === column._id}
                value={column._id}
                key={column._id}
              >
                {column.name}
              </option>
            ))}
          </select>
          <div id="add-task__button--bottom" className="btn-container">
            <button
              className="btn bg--purple text--white"
              onClick={handleClickSave}
            >
              Save Changes
            </button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default ViewTaskModal;
