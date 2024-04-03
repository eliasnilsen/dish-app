import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import DishDetails from "./DishDetails";
import DishCategorySection from "./DishCategorySection";
import DishAllergens from "./DishAllergens";
import ImagesSection from "./ImagesSection";
import { DishType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type DishFormData = {
  name: string;
  description: string;
  spiceLevel: string;
  prepTime: string;
  category: string;
  allergens: string[];
  imageFile: FileList;
  imageUrl: string;
};

type Props = {
  dish?: DishType;
  onChanges: (data: FormData) => void;
  isLoading: boolean;
};

const CreateDishForm = ({ dish, onChanges, isLoading }: Props) => {
  const formMethods = useForm<DishFormData>();

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(dish);
  }, [dish, reset]);

  const onSubmit: SubmitHandler<DishFormData> = (data) => {
    const formData = new FormData();
    if (dish) {
      formData.append("dishId", dish._id);
    }

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("spiceLevel", data.spiceLevel);
    formData.append("prepTime", data.prepTime);
    formData.append("category", data.category);

    if (data.allergens.length === 0) {
      formData.append("allergens", "");
    }

    data.allergens.forEach((allergen, index) => {
      formData.append(`allergens[${index}]`, allergen);
    });

    if (data.imageUrl) {
      formData.append(`imageUrl`, data.imageUrl);
    }

    if (data.imageFile) formData.append(`imageFile`, data.imageFile[0]);

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
            className="bg-teal hover:brightness-75 font-bold text-white px-3 py-2 rounded disabled:opacity-50"
          >
            {dish ? "Save changes" : "Create dish"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default CreateDishForm;
