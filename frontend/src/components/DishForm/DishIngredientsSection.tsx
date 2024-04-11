import { useFieldArray, useFormContext } from "react-hook-form";
import { DishFormData } from "./CreateDishForm";
import { dishIngredientUnits } from "../../misc/utils";

const DishIngredientsSection = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<DishFormData>();

  const { fields, prepend, remove } = useFieldArray({
    name: "ingredients",
    control,
    rules: {
      required: "Atleast one ingredient is required.",
    },
  });

  return (
    <div className="space-y-4">
      <h2>Ingredients</h2>
      <div className="">
        <div className="p-2 space-y-2 w-full">
          <div>
            <button
              className="primary-btn-teal"
              onClick={() => {
                prepend({ name: "", quantity: undefined, unit: undefined });
              }}
            >
              New
            </button>
          </div>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex items-end gap-2 w-full">
                <label className="flex flex-col">
                  Name
                  <input
                    {...register(`ingredients.${index}.name`, {
                      required: true,
                    })}
                    type="text"
                    className="p-1 focus:outline-none"
                  />
                </label>

                <label className="flex flex-col">
                  Quantity
                  <input
                    {...register(`ingredients.${index}.quantity`)}
                    type="number"
                    step="0.25"
                    className="p-1 focus:outline-none"
                  />
                </label>

                <label className="flex flex-col">
                  Unit
                  <select
                    {...register(`ingredients.${index}.unit`)}
                    className="p-1 bg-white focus:outline-none"
                  >
                    <option value={undefined}></option>
                    {dishIngredientUnits.map((unit) => (
                      <option key={unit} value={unit} className="">
                        {unit}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  onClick={() => {
                    remove(index);
                  }}
                  className="primary-btn-danger"
                >
                  Delete
                </button>
              </div>
            );
          })}

          {errors.ingredients && (
            <span className="text-red-600 font-normal text-xs">
              {errors.ingredients.message}
            </span>
          )}

          {errors.ingredients?.root && (
            <span className="text-red-600 font-normal text-xs">
              {errors.ingredients.root.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishIngredientsSection;
