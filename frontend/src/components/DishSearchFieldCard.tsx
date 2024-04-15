import { LuClock5, LuFlame } from "react-icons/lu";
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
      className="flex flex-col bg-white group md:h-[18rem] overflow-hidden rounded shadow-sm"
    >
      <img
        src={dish.imageUrl}
        alt="image of dish"
        className="h-[50%] object-cover"
      />
      <div className="flex flex-col justify-between p-3 gap-2 h-[50%]">
        <div className="flex flex-col gap-1">
          <span className="font-semibold line-clamp-2 break-words text-balance">
            {dish.name}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <span className="flex items-center gap-1">
            <LuFlame size={15} />
            {dish.spiceLevel}
          </span>
          <span className="flex items-center gap-1">
            <LuClock5 size={15} />
            {dish.prepTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DishSearchFieldCard;
