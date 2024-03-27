import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { LuClock5, LuFlame } from "react-icons/lu";

const MyDishes = () => {
  const { data: userDishes } = useQuery(
    "getUserDishes",
    apiClient.getUserDishes,
    {
      onSuccess: () => {},
      onError: () => {},
    }
  );

  if (!userDishes) {
    return <span>No dishes found.</span>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between w-full">
        <h2 className="text-2xl font-bold">My dishes</h2>
        <Link
          to="/create-dish"
          className="bg-blue-600 hover:bg-blue-500 font-bold text-white px-3 py-2 rounded disabled:opacity-50"
        >
          New dish
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {userDishes?.map((dish) => (
          <Link
            to={`/edit-dish/${dish._id}`}
            key={dish._id}
            className="flex flex-col justify-between border rounded p-4 gap-4"
          >
            <h2 className="text-xl font-bold">{dish.name}</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 bg-blue-100 rounded px-1">
                <LuClock5 />
                {dish.prepTime}
              </span>
              <span className="flex items-center gap-1 bg-blue-100 rounded px-1">
                <LuFlame />
                {dish.spiceLevel}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyDishes;
