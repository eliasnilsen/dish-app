import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import DishSearchFieldCard from "../components/DishSearchFieldCard";

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
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold">My dishes</h2>
        <Link to="/create-dish" className="primary-btn-teal">
          New dish
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {userDishes?.map((dish) => (
          <DishSearchFieldCard key={dish._id} route="edit-dish" dish={dish} />
        ))}
      </div>
    </div>
  );
};

export default MyDishes;
