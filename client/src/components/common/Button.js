import "./common.css";

const COLORS = {
  primary: {
    background: "#635FC7",
    textColor: "#ffffff",
  },
  secondary: {
    background: "#ffffff",
    textColor: "#635FC7",
  },
  danger: {
    background: "#EA5555",
    textColor: "#ffffff",
  },
};

const Button = ({ children, color, className }) => {
  return (
    <button
      className={`btn ${className}`}
      style={{
        background: COLORS[color].background,
        color: COLORS[color].textColor
      }}
    >
      {children}
    </button>
  );
};

export default Button;
