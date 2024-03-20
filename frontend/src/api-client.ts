import { RegisterFormValues } from "./components/RegisterForm";
import { LoginFormValues } from "./components/LoginForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// register
export const register = async (registerFormData: RegisterFormValues) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerFormData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
};

// login
export const login = async (loginFormData: LoginFormValues) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginFormData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// logout
export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error signing out.");
  }
};

// verify token
export const verifyToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Invalid token.");
  }

  return response.json();
};

// create dish
export const createDish = async (data: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-dishes`, {
    method: "POST",
    credentials: "include",
    body: data,
  });
  if (!response) {
    throw new Error("Failed to create dish.");
  }

  return response.json();
};
