export type DishType = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  spiceLevel: string;
  prepTime: string;
  category: string;
  allergens: string[];
  imageUrl: string;
  lastUpdated: Date;
};

export type DishSearchResponse = {
  data: DishType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
