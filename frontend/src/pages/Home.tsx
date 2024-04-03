import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import RecentDishCard from "../components/RecentDishCard";

const Home = () => {
  const { data: dishes } = useQuery("getDishes", () => apiClient.getDishes());

  const topRowDishes = dishes?.slice(0, 2) || [];
  const bottomRowDishes = dishes?.slice(2, 6) || [];

  return (
    <div className="space-y-4">
      <div className="text-center text-balance p-4">
        <h2 className="text-4xl font-bold tracking-tight">Latest Dishes</h2>
        <p className="">
          Check out these dishes recently added by other users!
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topRowDishes?.map((dish) => (
            <RecentDishCard dish={dish} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowDishes?.map((dish) => (
            <RecentDishCard dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
