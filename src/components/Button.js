const Button = ({ children, onClick }) => {
  return (
    <button className="text-vibrantBlue" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
