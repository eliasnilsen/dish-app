import { useFormContext } from "react-hook-form";
import { DishDetailsFormValues } from "./CreateDishForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DishDetailsFormValues>();

  return (
    <div className="space-y-4 p-8 rounded">
      <h2 className="text-2xl font-bold">Add Images</h2>
      <div className="flex flex-col">
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles")}
        />
        {errors.imageFiles && (
          <span className="text-red-600 font-normal text-xs">
            {errors.imageFiles.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImagesSection;
