import { Link } from "react-router-dom";
import { DishType } from "../../../backend/src/shared/types";

type Props = {
  dish: DishType;
};
const RecentDishCard = ({ dish }: Props) => {
  return (
    <Link
      to={`/details/${dish._id}`}
      className="relative cursor-pointer overflow-hidden rounded shadow-sm"
    >
      <div className="h-[300px]">
        <img
          src={dish.imageUrl}
          alt={`image of featured dish by the name of: ${dish.name}`}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute bottom-0 p-4 bg-teal bg-opacity-100 w-full">
        <span className="text-white tracking-tight text-2xl">{dish.name}</span>
      </div>
    </Link>
  );
};

export default RecentDishCard;
