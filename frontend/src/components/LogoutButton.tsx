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
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      className="px-2 py-1 rounded font-semibold border border-white hover:text-blue-800 hover:bg-white transition duration-150 ease-in-out"
      onClick={handleClick}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
