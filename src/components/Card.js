const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-card hover:shadow-cardHover rounded-lg cursor-pointer p-4">
      {children}
    </div>
  );
};

export default Card;
