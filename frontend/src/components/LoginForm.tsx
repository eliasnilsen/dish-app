import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ApiClient from "../api-client.ts";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginFormValues = z.infer<typeof LoginZodSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(LoginZodSchema) });

  const mutation = useMutation(ApiClient.login, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("verifyToken");
      toast.success("Successfully logged in!");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-8 border rounded"
    >
      <h2 className="text-2xl font-bold">Login</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="flex flex-col font-semibold text-sm">
            Email
            <input
              {...register("email")}
              type="email"
              className="border rounded w-full py-1 px-2 mt-1"
            />
          </label>
          {errors.email && (
            <span className="text-red-600 font-normal text-xs">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label className="flex flex-col font-semibold text-sm">
            Password
            <input
              {...register("password")}
              type="password"
              className="border rounded w-full py-1 px-2 mt-1"
            />
          </label>
          {errors.password && (
            <span className="text-red-600 font-normal text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between space-y-2 bg-blue-100 p-4">
        <span className="flex text-xs">
          <p className="whitespace-pre">Don't have an account yet? </p>
          <Link to={"/register"} className="underline">
            Register here
          </Link>
        </span>

        <span>
          <button
            type="submit"
            className="bg-teal font-bold text-white px-3 py-2 rounded-md hover:brightness-75"
          >
            Login
          </button>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
