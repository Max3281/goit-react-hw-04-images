const Loader = ({ onClick, dis }) => {
  return (
    <button
      type="button"
      className="load-more"
      disabled={dis}
      onClick={onClick}
    >
      Load more
    </button>
  );
};

export default Loader;
