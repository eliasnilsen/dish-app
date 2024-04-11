import { useFormContext } from "react-hook-form";
import { dishPrepTime, dishSpiceLevel } from "../../misc/utils";
import { DishFormData } from "./CreateDishForm";

const DishDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DishFormData>();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="flex flex-col">
            Name
            <input
              {...register("name", {
                required: "This field is required",
              })}
              type="text"
              className="w-full py-1 px-2 mt-1 text-base font-normal focus:outline-none"
            />
          </label>
          {errors.name && (
            <span className="text-red-600 font-normal text-xs">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="flex flex-col">
            Description
            <textarea
              {...register("description", {
                required: "This field is required",
              })}
              rows={10}
              className="resize-none w-full py-1 px-2 mt-1 text-base font-normal focus:outline-none"
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
                {...register("spiceLevel", {
                  required: "This field is required",
                })}
                className="bg-stone-200 border rounded w-full py-2 px-2 mt-1"
              >
                <option value="" className="text-sm" disabled>
                  Spice Level
                </option>
                {dishSpiceLevel.map((spiceLevel) => (
                  <option
                    key={spiceLevel}
                    value={spiceLevel}
                    className="text-sm font-normal"
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
                {...register("prepTime", {
                  required: "This field is required",
                })}
                className="bg-stone-200 border rounded w-full py-2 px-2 mt-1"
              >
                <option value="" className="text-sm" disabled>
                  Prep Time
                </option>
                {dishPrepTime.map((prepTime) => (
                  <option
                    key={prepTime}
                    value={prepTime}
                    className="text-sm font-normal"
                  >
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
