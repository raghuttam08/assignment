interface CardProps {
    title: string;
    value: string;
    color: string; // Used to apply different colors to each card
  }
  
  const Card: React.FC<CardProps> = ({ title, value, color }) => {
    return (
      <div className={`bg-${color}-500 text-white p-6 rounded-lg shadow-md`}>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-2xl">{value}</p>
      </div>
    );
  };
  
  export default Card;
  