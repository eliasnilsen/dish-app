import { useMutation, useQueryClient } from "react-query";
import CreateDishForm from "../components/DishForm/CreateDishForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as ApiClient from "../api-client.ts";

const CreateDish = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(ApiClient.createDish, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("verifyToken");
      toast.success("Successfully created dish!");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSaveChanges = (data: FormData) => {
    mutate(data);
  };

  return (
    <div>
      <CreateDishForm onChanges={handleSaveChanges} isLoading={isLoading} />
    </div>
  );
};

export default CreateDish;
