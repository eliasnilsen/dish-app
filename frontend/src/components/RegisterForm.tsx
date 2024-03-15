import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ApiClient from "../api-client.ts";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterZodSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof RegisterZodSchema>;

const RegisterForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(RegisterZodSchema) });

  const mutation = useMutation(ApiClient.register, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("verifyToken");
      toast.success("Successfully registered!");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-8 border rounded"
    >
      <h2 className="text-2xl font-bold">Register</h2>
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

        <div>
          <label className="flex flex-col font-semibold text-sm">
            Confirm Password
            <input
              {...register("confirmPassword")}
              type="password"
              className="border rounded w-full py-1 px-2 mt-1"
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-600 font-normal text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between bg-blue-100 p-4">
        <span className="flex text-xs">
          <p className="whitespace-pre">Already registered? </p>
          <Link to={"/login"} className="underline">
            Login here
          </Link>
        </span>

        <span>
          <button
            type="submit"
            className="bg-blue-600 font-bold text-white px-3 py-2 rounded"
          >
            Create Account
          </button>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
