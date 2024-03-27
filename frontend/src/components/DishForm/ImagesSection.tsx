import { useFormContext } from "react-hook-form";
import { DishDetailsFormValues } from "./CreateDishForm";
import { LuTrash2 } from "react-icons/lu";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<DishDetailsFormValues>();

  type Props = {
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    imageUrl: string;
  };

  const existingImageUrls = watch("imageUrls");

  //discards images that were "removed" from the form.
  const handleDelete = ({ event, imageUrl }: Props) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls?.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div className="space-y-4 p-8 rounded">
      <h2 className="text-2xl font-bold">Add Images</h2>
      <div className="flex flex-col">
        {existingImageUrls && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {existingImageUrls.map((imageUrl) => (
              <div key={imageUrl} className="relative group">
                <img
                  src={imageUrl}
                  alt="dish image"
                  className="min-h-full object-cover"
                />
                <button
                  onClick={(event) => handleDelete({ event, imageUrl })}
                  className="flex items-center justify-center absolute top-0 right-0 p-2 bg-red-600 bg-opacity-50 hover:bg-opacity-75"
                >
                  <LuTrash2 />
                </button>
              </div>
            ))}
          </div>
        )}
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
