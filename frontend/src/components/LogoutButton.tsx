import * as ApiClient from "../api-client.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

const LogoutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // calls the logout function which drops the users token,
  // then refetches verifytoken query, which will return an empty/expired token
  const mutation = useMutation(ApiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("verifyToken");
      toast.success("Successfully signed out.");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button className="primary-btn-teal" onClick={handleClick}>
      Logout
    </button>
  );
};

export default LogoutButton;
