import { useFormContext } from "react-hook-form";
import { dishAllergens } from "../../misc/utils";
import { DishFormData } from "./CreateDishForm";

const DishAllergensSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DishFormData>();

  return (
    <div className="space-y-4">
      <h2 className="">Allergens</h2>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 bg-white p-2">
        {dishAllergens.map((allergen) => (
          <label
            key={allergen}
            className="flex gap-2 items-center cursor-pointer text-sm px-2 py-2 font-semibold"
          >
            <input
              type="checkbox"
              value={allergen}
              {...register("allergens")}
              className="checkbox"
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
