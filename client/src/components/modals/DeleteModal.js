const DeleteModal = ({ closeModal }) => {

  const handleClickDelete = () => {
    // console.log('delete')
  };

  return (
    <div id="delete__modal" className="form__modal">
      <div className="form__modal-content bg--dark-grey">
        <h1 className="text--red">Delete this board?</h1>
        <p className="text--medium">
          Are you sure you want to delete the 'Platform Launch' board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>

        <div className="btn-container">
          <button
            className="btn bg--red text--white"
            onClick={handleClickDelete}
          >
            Delete
          </button>
        </div>

        <div className="btn-container">
          <button className="btn bg--white text--main" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
