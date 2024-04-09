import { useFormContext } from "react-hook-form";
import { DishFormData } from "./CreateDishForm";
import { LuTrash2 } from "react-icons/lu";

const MAX_IMAGE_FILE_SIZE = 1024 * 1024 * 5; //5mb

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<DishFormData>();

  const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-4 rounded">
      <h2 className="text-2xl font-bold">Add Image</h2>
      <div className="flex flex-col gap-2">
        {existingImageUrl && (
          <div className="">
            <div className="relative group col-span-1 w-fit">
              <img
                src={existingImageUrl}
                alt="dish image"
                className="object-cover w-[200px]"
              />
              <button
                onClick={() => setValue("imageUrl", "")}
                className="flex items-center justify-center absolute top-0 right-0 p-2 bg-red-600 hover:bg-opacity-75"
              >
                <LuTrash2 />
              </button>
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          {...register("imageFile", {
            validate: (imageFile) => {
              if (existingImageUrl && imageFile === undefined) {
                return true;
              }

              if (!imageFile[0] && !existingImageUrl) {
                return "Image is required.";
              }

              if (existingImageUrl && imageFile[0]) {
                return "Max one image.";
              }

              if (
                imageFile.length > 0 &&
                imageFile[0].size > MAX_IMAGE_FILE_SIZE
              ) {
                return "Max image size is 5mb.";
              }

              return true;
            },
          })}
        />
        {errors.imageFile && (
          <span className="text-red-600 font-normal text-xs">
            {errors.imageFile.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImagesSection;
