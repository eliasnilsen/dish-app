import { Link } from "react-router-dom";
import { DishType } from "../../../backend/src/shared/types";

type Props = {
  dish: DishType;
};
const RecentDishCard = ({ dish }: Props) => {
  return (
    <Link
      to={`/details/${dish._id}`}
      className="cursor-pointer overflow-hidden"
    >
      <div className="h-[300px]">
        <img
          src={dish.imageUrl}
          alt={`image of featured dish by the name of: ${dish.name}`}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="w-full p-2 bg-white">
        <span className="font-semibold text-xl text-black text-balance line-clamp-2">
          {dish.name}
        </span>
      </div>
    </Link>
  );
};

export default RecentDishCard;
