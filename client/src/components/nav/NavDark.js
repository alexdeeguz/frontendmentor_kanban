import "./nav.css";

const NavDark = () => {
  return (
    <nav className="nav bg--dark-grey">
      <div>
        <img className="logo" src="/assets/logo-mobile.svg" />
        <button className="logo__title text--dark">
          Platform Launch
          <img src="/assets/icon-chevron-down.svg" />
        </button>
      </div>

      <div>
        <button className="plus__btn bg--purple">+</button>
        <button>
          <img src="/assets/icon-vertical-ellipsis.svg" />
        </button>
      </div>
    </nav>
  );
};

export default NavDark;
