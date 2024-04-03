import { useFormContext } from "react-hook-form";
import { dishCategory } from "../../misc/utils";
import { DishFormData } from "./CreateDishForm";

const DishCategorySection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<DishFormData>();
  const selectedCategory = watch("category");

  return (
    <div className="space-y-4 p-8 rounded">
      <h2 className="text-2xl font-bold">Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {dishCategory.map((category) => (
          <label
            key={category}
            className={
              selectedCategory === category
                ? "flex justify-center cursor-pointer bg-teal text-white rounded-full text-sm px-4 py-3 font-semibold"
                : "flex justify-center cursor-pointer border rounded-full text-sm px-4 py-3 font-semibold"
            }
          >
            <input
              type="radio"
              value={category}
              {...register("category", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
      {errors.category && (
        <span className="text-red-600 font-normal text-xs">
          {errors.category.message}
        </span>
      )}
    </div>
  );
};

export default DishCategorySection;
