import { dishCategory } from "../misc/utils";

type Props = {
  selectedCategories: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CategoryFilter = ({ selectedCategories, onChange }: Props) => {
  return (
    <div className="space-y-2 w-fit">
      <h2 className="font-semibold">Categories</h2>
      {dishCategory.map((category) => (
        <label
          key={category}
          className="flex items-center gap-1 w-fit cursor-pointer"
        >
          <input
            type="checkbox"
            className="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={onChange}
          />
          <span>{category}</span>
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;
