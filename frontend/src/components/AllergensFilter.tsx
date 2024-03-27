import { dishAllergens } from "../misc/utils";

type Props = {
  selectedAllergens: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AllergensFilter = ({ selectedAllergens, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <h2 className="font-bold">{`Allergens (Does not contain)`}</h2>
      {dishAllergens.map((allergens) => (
        <label
          key={allergens}
          className="flex items-center gap-1 rounded px-2 w-fit cursor-pointer"
        >
          <input
            type="checkbox"
            className="rounded cursor-pointer"
            value={allergens}
            checked={selectedAllergens.includes(allergens)}
            onChange={onChange}
          />
          <span>{allergens}</span>
        </label>
      ))}
    </div>
  );
};

export default AllergensFilter;
