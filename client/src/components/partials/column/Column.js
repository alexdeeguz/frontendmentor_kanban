import { useEffect, useState } from "react";
import { fetchTasks } from "../../../actions/tasks";
import "../partials.css";

const Column = ({ data, column, selectTask, darkMode, index }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks(column._id).then((res) => setTasks(res.data));
  }, [data]);

  return (
    <section className="column">
      <div className="column__header">
        <div className={`dot dot-${index}`}></div>
        <h1 className={`${darkMode ? "text--medium" : "text--dark"}`}>{column.name.toUpperCase()} ({tasks.length})</h1>
      </div>

      {tasks?.map((task) => (
        <div key={task._id} className={`column__card ${darkMode ? "bg--dark-grey" : "bg--light"}`} onClick={() => selectTask(task)}>
          <h2 className={darkMode ? "text--white" : "text--dark"}>{task.title}</h2>
          <h3 className={`text--medium`}>
            {task.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
            {task.subtasks.length + " "}
            subtasks
          </h3>
        </div>
      ))}
    </section>
  );
};

export default Column;
