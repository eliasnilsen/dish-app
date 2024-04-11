import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { LuChefHat, LuClock5, LuFlame, LuMinus, LuPlus } from "react-icons/lu";
import { useState } from "react";

const DishDetails = () => {
  const [portions, setPortions] = useState(1);
  const minPortionSize = 1;
  const maxPortionSize = 100;

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
      <div className="overflow-auto">
        <img
          src={dishData.imageUrl}
          alt={`image of ${dishData.name}`}
          className="w-full max-h-[40rem] object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-y-4">
        {/* Dish details section */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 bg-white md:col-span-2">
          <div className="flex items-center justify-center gap-4 px-3 py-1">
            <span className="flex items-center gap-1">
              <LuChefHat size={20} strokeWidth={1.5} />
              {dishData.category}
            </span>
            <span className="flex items-center gap-1">
              <LuClock5 size={20} strokeWidth={1.5} />
              {dishData.prepTime}
            </span>
            <span className="flex items-center gap-1">
              <LuFlame size={20} strokeWidth={1.5} />
              {dishData.spiceLevel}
            </span>
          </div>
          <h2 className="text-5xl font-semibold text-balance text-center">
            {dishData.name}
          </h2>

          <p className="text-balance text-center md:text-lg">
            {dishData.description}
          </p>

          {dishData.allergens && (
            <div className="flex flex-col items-center gap-1 p-2 text-center">
              <h1 className="text-balance">Allergens:</h1>
              <div className="flex flex-wrap gap-2">
                {dishData.allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="flex items-center border border-black text-sm py-1 px-2 bg-caution"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 bg-white md:col-span-3 order-last w-full">
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">Instructions</h2>
            {dishData.instructions.map((instruction, index) => (
              <div key={instruction} className="">
                <label className="flex gap-2 items-baseline cursor-pointer">
                  <div className="flex items-baseline gap-2">
                    <input type="checkbox" className="checkbox" />
                    <span className="font-semibold">{index + 1}.</span>
                  </div>
                  <span className="flex-1 text-pretty">{instruction}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients list */}
        <div className="p-6 sm:p-8 flex flex-col bg-white md:col-span-1 md:order-first space-y-4">
          {/* Portions controller */}
          <div className="flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-semibold">Ingredients</h2>
            <div className="flex flex-col">
              <div className="flex items-center gap-4 w-fit h-fit p-3">
                <button
                  disabled={portions <= minPortionSize}
                  onClick={() => setPortions(portions - 1)}
                  className={`rounded-full p-1 bg-teal text-white ${
                    portions <= minPortionSize ? "opacity-50" : ""
                  }`}
                >
                  <LuMinus size={30} />
                </button>
                <div className="flex flex-col justify-center items-center text-xl">
                  <span>{portions}</span>
                  <span>Portions</span>
                </div>
                <button
                  disabled={portions >= maxPortionSize}
                  onClick={() => setPortions(portions + 1)}
                  className={`rounded-full p-1 bg-teal text-white ${
                    portions >= maxPortionSize ? "opacity-50" : ""
                  }`}
                >
                  <LuPlus size={30} />
                </button>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-2">
            {dishData.ingredients.map((item) => (
              <div key={item.name} className="flex items-baseline gap-1">
                {item.quantity && <span>{item.quantity * portions}</span>}
                {item.unit && <span>{item.unit}</span>}
                <span className="flex flex-1">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
