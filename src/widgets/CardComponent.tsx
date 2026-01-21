import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  image: string;
  description: string;
  type: string;
}

const Card: React.FC<CardProps> = ({ title, image, description, type }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <div
        onClick={() => navigate(`/details/${type}`)}
        className="border-2 rounded-xl p-4 hover:shadow-lg transition hover:cursor-pointer h-52 w-52"
      >
        <img
          src={image}
          alt={title}
          srcSet=""
          className="h-20 w-20 mx-auto mb-2 object-contain"
        />
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Card;
