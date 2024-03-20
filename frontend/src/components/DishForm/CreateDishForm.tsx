import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import DishDetails from "./DishDetails";
import DishCategorySection from "./DishCategorySection";
import DishAllergens from "./DishAllergens";
import ImagesSection from "./ImagesSection";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_IMAGE_FILE_SIZE = 1024 * 1024 * 5; //5mb
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const DishDetailsZodSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  spiceLevel: z.string().min(1),
  prepTime: z.string().min(1),
  allergens: z.array(z.string()),
  imageFiles: z
    .custom<FileList>((files) => files instanceof FileList)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Accepted Formats: JPG/JPEG/PNG"
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_IMAGE_FILE_SIZE,
      "Max file size: 5mb"
    )
    .refine((files) => files.length < 5, "Max 5 images."),
});

export type DishDetailsFormValues = z.infer<typeof DishDetailsZodSchema>;

type Props = {
  onChanges: (data: FormData) => void;
  isLoading: boolean;
};

const CreateDishForm = ({ onChanges, isLoading }: Props) => {
  const formMethods = useForm<DishDetailsFormValues>({
    resolver: zodResolver(DishDetailsZodSchema),
  });

  const { handleSubmit } = formMethods;

  const onSubmit: SubmitHandler<DishDetailsFormValues> = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("spiceLevel", data.spiceLevel);
    formData.append("prepTime", data.prepTime);
    formData.append("category", data.category);

    // add an individual data string for each allergen provided by the list.
    data.allergens.forEach((allergen, index) => {
      formData.append(`allergens[${index}]`, allergen);
    });

    // convert to array to be able to use forEach function.
    Array.from(data.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onChanges(formData);

    console.log(data);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="select-none divide-y space-y-4"
      >
        <DishDetails />
        <DishCategorySection />
        <DishAllergens />
        <ImagesSection />
        <span className="flex justify-end p-8">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 font-bold text-white px-3 py-2 rounded disabled:opacity-50"
          >
            Create Dish
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default CreateDishForm;
