export type DishType = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  spiceLevel: string;
  prepTime: string;
  category: string;
  allergens: string[];
  ingredients: Ingredient[];
  instructions: string[];
  imageUrl: string;
  lastUpdated: Date;
};

export type Instruction = {
  instruction: string;
};

export type Ingredient = {
  name: string;
  quantity?: number;
  unit?: string;
};

export type DishSearchResponse = {
  data: DishType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
