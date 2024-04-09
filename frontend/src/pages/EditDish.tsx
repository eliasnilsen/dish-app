import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import CreateDishForm from "../components/DishForm/CreateDishForm";
import toast from "react-hot-toast";

const EditDish = () => {
  const navigate = useNavigate();
  const { dishId } = useParams();

  const { data: dish } = useQuery(
    "getUserDishById",
    () => apiClient.getUserDishById(dishId || ""),
    {
      enabled: !!dishId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateUserDishById, {
    onSuccess: async () => {
      toast.success("Successfully updated dish!");
      navigate("/my-dishes");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSaveChanges = (data: FormData) => {
    mutate(data);
  };

  return (
    <CreateDishForm
      dish={dish}
      onChanges={handleSaveChanges}
      isLoading={isLoading}
    />
  );
};

export default EditDish;
