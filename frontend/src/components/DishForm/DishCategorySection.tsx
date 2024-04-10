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
    <div className="space-y-4">
      <h2 className="">Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-2">
        {dishCategory.map((category) => (
          <label
            key={category}
            className={
              selectedCategory === category
                ? "flex justify-center cursor-pointer bg-black text-white text-sm px-4 py-3 font-semibold"
                : "flex justify-center cursor-pointer border-2 border-black text-sm px-4 py-3 font-semibold"
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
