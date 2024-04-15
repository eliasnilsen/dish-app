import { RegisterFormValues } from "./components/RegisterForm";
import { LoginFormValues } from "./components/LoginForm";
import { DishSearchResponse, DishType } from "../../backend/src/shared/types";

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
    method: "GET",
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

// get all dishes.
export const getDishes = async (): Promise<DishType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/dishes`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error fetching dishes.");
  }

  return response.json();
};

// get user dishes.
export const getUserDishes = async (): Promise<DishType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-dishes`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching dishes.");
  }

  return response.json();
};

// get dish by id.
export const getUserDishById = async (dishId: string): Promise<DishType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-dishes/${dishId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching dish.");
  }

  return response.json();
};

// update dish by id.
export const updateUserDishById = async (data: FormData): Promise<DishType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-dishes/${data.get("dishId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error("Error updating dish.");
  }

  return response.json();
};

export type SearchParams = {
  name?: string;
  category?: string[];
  spiceLevel?: string[];
  prepTime?: string[];
  allergens?: string[];
  page?: string;
  sortOption?: string;
};

export const searchDishes = async (
  searchParams: SearchParams
): Promise<DishSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("name", searchParams.name || "");

  searchParams.category?.forEach((category) =>
    queryParams.append("category", category || "")
  );
  searchParams.spiceLevel?.forEach((spiceLevel) =>
    queryParams.append("spiceLevel", spiceLevel || "")
  );
  searchParams.prepTime?.forEach((prepTime) =>
    queryParams.append("prepTime", prepTime || "")
  );
  searchParams.allergens?.forEach((allergens) =>
    queryParams.append("allergens", allergens || "")
  );

  queryParams.append("page", searchParams.page || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  const response = await fetch(
    `${API_BASE_URL}/api/dishes/search?${queryParams}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching dishes.");
  }

  return response.json();
};

export const getDishById = async (dishId: string): Promise<DishType> => {
  const response = await fetch(`${API_BASE_URL}/api/dishes/${dishId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error fetching dish.");
  }

  return response.json();
};

// get dish by id.
export const deleteUserDishById = async (dish: DishType) => {
  const response = await fetch(`${API_BASE_URL}/api/my-dishes/${dish._id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching dish.");
  }

  return response.json();
};
