import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { LuChefHat, LuClock5, LuFlame } from "react-icons/lu";

const DishDetails = () => {
  const { dishId } = useParams();

  const { data: dishData } = useQuery(
    "getDishById",
    () => apiClient.getDishById(dishId as string),
    {
      enabled: !!dishId,
    }
  );

  if (!dishData) {
    return <></>;
  }

  return (
    <div className="space-y-4 select-text">
      <div className="shadow overflow-auto rounded-md">
        <img
          src={dishData.imageUrl}
          alt={`image of ${dishData.name}`}
          className="w-full max-h-[30rem] object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="shadow-sm rounded-md p-6 sm:p-8 flex flex-col items-center gap-6 bg-white col-span-2">
          <div className="text-sm flex items-center justify-center gap-4 font-semibold border bg-stone-100 px-3 py-1 rounded">
            <span className="flex items-center gap-1">
              <LuChefHat />
              {dishData.category}
            </span>
            <span className="flex items-center gap-1">
              <LuClock5 />
              {dishData.prepTime}
            </span>
            <span className="flex items-center gap-1">
              <LuFlame />
              {dishData.spiceLevel}
            </span>
          </div>
          <h2 className="text-5xl font-bold text-balance text-center">
            {dishData.name}
          </h2>

          <p className="text-balance text-center md:text-lg">
            {dishData.description}
          </p>
          {dishData.allergens && (
            <div className="flex flex-col items-center gap-1 p-4 text-center bg-caution rounded-md">
              <h1 className="font-semibold text-balance">
                This dish contains the following allergens:
              </h1>
              <div className="flex flex-wrap gap-2">
                {dishData.allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="flex items-center border rounded text-sm py-1 px-2 bg-stone-100 font-semibold"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="shadow-sm rounded-md p-6 sm:p-8 flex flex-col items-center bg-white col-span-1 sm:order-first order-last">
          Ingridients list goes here
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
