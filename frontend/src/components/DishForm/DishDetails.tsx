import { useFormContext } from "react-hook-form";
import { dishPrepTime, dishSpiceLevel } from "../../misc/utils";
import { DishDetailsFormValues } from "./CreateDishForm";

const DishDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DishDetailsFormValues>();

  return (
    <div className="space-y-4 p-8 rounded">
      <h2 className="text-2xl font-bold">Create Dish</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="flex flex-col font-semibold text-sm">
            Name
            <input
              {...register("name")}
              type="text"
              className="border rounded w-full py-1 px-2 mt-1 text-base font-normal"
            />
          </label>
          {errors.name && (
            <span className="text-red-600 font-normal text-xs">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="flex flex-col font-semibold text-sm">
            Description
            <textarea
              {...register("description")}
              rows={10}
              className="border resize-none rounded w-full py-1 px-2 mt-1 text-base font-normal"
            ></textarea>
          </label>
          {errors.description && (
            <span className="text-red-600 font-normal text-xs">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex w-full gap-2">
          <div className="flex flex-col flex-1 max-w-[50%]">
            <label className="flex flex-col font-semibold text-sm">
              Spice Level
              <select
                {...register("spiceLevel")}
                className="bg-blue-100 border rounded w-full py-2 px-2 mt-1"
              >
                <option value="" className="text-sm" disabled>
                  --Spice Level--
                </option>
                {dishSpiceLevel.map((spiceLevel) => (
                  <option
                    key={spiceLevel}
                    value={spiceLevel}
                    className="text-sm"
                  >
                    {spiceLevel}
                  </option>
                ))}
              </select>
            </label>
            {errors.spiceLevel && (
              <span className="text-red-600 font-normal text-xs">
                {errors.spiceLevel.message}
              </span>
            )}
          </div>
          <div className="flex flex-col flex-1 max-w-[50%]">
            <label className="flex flex-col font-semibold text-sm">
              Prep Time
              <select
                {...register("prepTime")}
                className="bg-blue-100 border rounded w-full py-2 px-2 mt-1"
              >
                <option value="" className="text-sm" disabled>
                  --Prep Time--
                </option>
                {dishPrepTime.map((prepTime) => (
                  <option key={prepTime} value={prepTime} className="text-sm">
                    {prepTime}
                  </option>
                ))}
              </select>
            </label>
            {errors.prepTime && (
              <span className="text-red-600 font-normal text-xs">
                {errors.prepTime.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
