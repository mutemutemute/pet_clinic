import { useState } from "react";
import { FaStar } from "react-icons/fa";

function Rating({ initialRating = 0, onRate }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (newRating) => {
    setRating(newRating);
    onRate(newRating); 
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={30}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          color={(hover || rating) >= star ? "#ffc107" : "#e4e5e9"}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
}

export default Rating;