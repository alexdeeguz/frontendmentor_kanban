import Button from "../common/Button";
import "./partials.css"

const Empty = () => {
  return (
    <section className="empty">
      <p className="empty__text">
        This board is empty. Create a new column to get started.
      </p>
      <Button className="btn--small" color="primary">+ Add New Column</Button>
    </section>
  );
};

export default Empty;
