import { useFormContext } from "react-hook-form";
import { dishAllergens } from "../../misc/utils";
import { DishDetailsFormValues } from "./CreateDishForm";

const DishAllergensSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DishDetailsFormValues>();

  return (
    <div className="space-y-4 p-8 rounded">
      <h2 className="text-2xl font-bold">Allergens</h2>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
        {dishAllergens.map((allergen) => (
          <label
            key={allergen}
            className="flex gap-2 items-center cursor-pointer bg-blue-100 rounded text-sm px-2 py-2 font-semibold"
          >
            <input
              type="checkbox"
              value={allergen}
              {...register("allergens")}
              className=""
            />
            <span>{allergen}</span>
          </label>
        ))}
      </div>
      {errors.allergens && (
        <span className="text-red-600 font-normal text-xs">
          {errors.allergens.message}
        </span>
      )}
    </div>
  );
};

export default DishAllergensSection;
