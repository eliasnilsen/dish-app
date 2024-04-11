import { LuClock5, LuFlame, LuChefHat } from "react-icons/lu";
import { DishType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  dish: DishType;
  route: string;
};

const DishSearchFieldCard = ({ dish, route }: Props) => {
  return (
    <Link
      to={`/${route}/${dish._id}`}
      className="flex md:flex-col bg-white group h-[12rem] md:h-[20rem] overflow-hidden rounded-md"
    >
      <img
        src={dish.imageUrl}
        alt="image of dish"
        className="md:w-full md:h-[50%] w-[50%] object-cover"
      />
      <div className="flex flex-col justify-between p-3 gap-2 w-[50%] md:w-full md:h-[50%]">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1">
            <LuChefHat size={15} />
            {dish.category}
          </span>
          <span className="font-semibold line-clamp-2 break-words text-balance">
            {dish.name}
          </span>
        </div>

        <div className="block md:flex gap-2 space-y-1 md:space-y-0 justify-around">
          <span className="flex items-center gap-1">
            <LuClock5 size={15} />
            {dish.prepTime}
          </span>
          <span className="flex items-center gap-1">
            <LuFlame size={15} />
            {dish.spiceLevel}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DishSearchFieldCard;
