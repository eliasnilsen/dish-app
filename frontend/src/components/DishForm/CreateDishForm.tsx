import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import DishDetails from "./DishDetails";
import DishCategorySection from "./DishCategorySection";
import DishAllergens from "./DishAllergens";
import ImagesSection from "./ImagesSection";
import { DishType, Ingredient } from "../../../../backend/src/shared/types";
import { useEffect } from "react";
import DishIngredientsSection from "./DishIngredientsSection";

export type DishFormData = {
  name: string;
  description: string;
  spiceLevel: string;
  prepTime: string;
  category: string;
  allergens: string[];
  ingredients: Ingredient[];
  imageFile?: FileList;
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

    const allergensJSON = JSON.stringify(data.allergens);
    formData.append("allergens", allergensJSON);

    const ingredientsJSON = JSON.stringify(data.ingredients);
    formData.append("ingredients", ingredientsJSON);

    if (data.imageUrl) {
      formData.append(`imageUrl`, data.imageUrl);
    }

    if (data.imageFile !== undefined)
      formData.append(`imageFile`, data.imageFile[0]);

    onChanges(formData);
    console.log(formData);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="select-none space-y-8">
        <h2 className="text-3xl font-bold">
          {dish ? "Update dish" : "Create Dish"}
        </h2>
        <DishDetails />
        <DishIngredientsSection />
        <DishCategorySection />
        <DishAllergens />
        <ImagesSection />
        <span className="flex justify-end p-8">
          <button
            disabled={isLoading}
            type="submit"
            className="primary-btn-teal"
          >
            {dish ? "Save changes" : "Create dish"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default CreateDishForm;
