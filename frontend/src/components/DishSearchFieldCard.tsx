import { LuClock5, LuFlame, LuChefHat } from "react-icons/lu";
import { DishType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  dish: DishType;
};

const DishSearchFieldCard = ({ dish }: Props) => {
  return (
    <Link
      to={`/details/${dish._id}`}
      className="flex md:flex-col bg-white border group h-[10rem] md:h-[15rem] shadow rounded-md overflow-hidden"
    >
      <img
        src={dish.imageUrl}
        alt="image of dish"
        className="md:w-full md:h-[50%] w-[50%] object-cover"
      />
      <div className="flex flex-col justify-between p-3 gap-2 w-[50%] md:w-full md:h-[50%]">
        <div className="flex flex-col gap-1">
          <span className="text-sm flex items-center gap-1 opacity-75">
            <LuChefHat />
            {dish.category}
          </span>
          <span className="text-sm font-semibold line-clamp-2 break-words text-balance">
            {dish.name}
          </span>
        </div>

        <div className="block md:flex justify-between text-sm space-y-1 md:space-y-0 opacity-75">
          <span className="flex items-center gap-1">
            <LuClock5 />
            {dish.prepTime}
          </span>
          <span className="flex items-center gap-1">
            <LuFlame />
            {dish.spiceLevel}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DishSearchFieldCard;
