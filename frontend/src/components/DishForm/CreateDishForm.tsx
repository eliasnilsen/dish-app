import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import DishDetails from "./DishDetails";
import DishCategorySection from "./DishCategorySection";
import DishAllergens from "./DishAllergens";
import ImagesSection from "./ImagesSection";
import { DishType, Ingredient } from "../../../../backend/src/shared/types";
import { useEffect } from "react";
import DishIngredientsSection from "./DishIngredientsSection";
import DishInstructionsSection from "./DishInstructionsSection";

export type DishFormData = {
  name: string;
  description: string;
  spiceLevel: string;
  prepTime: string;
  category: string;
  allergens: string[];
  ingredients: Ingredient[];
  instructions: string[];
  imageFile?: FileList;
  imageUrl: string;
};

type Props = {
  dish?: DishType;
  onChanges: (data: FormData) => void;
  onDelete?: (data: DishType) => void;
  isLoading: boolean;
};

const CreateDishForm = ({ dish, onChanges, onDelete, isLoading }: Props) => {
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

    const instructionsJSON = JSON.stringify(data.instructions);
    formData.append("instructions", instructionsJSON);

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
        <DishInstructionsSection />
        <DishCategorySection />
        <DishAllergens />
        <ImagesSection />
        <span className="flex justify-end gap-2 p-8">
          {dish && (
            <button
              onClick={() => onDelete!(dish)}
              className="primary-btn-danger"
              type="button"
            >
              Delete dish
            </button>
          )}
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
