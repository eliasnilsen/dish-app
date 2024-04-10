import { dishAllergens } from "../misc/utils";

type Props = {
  selectedAllergens: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AllergensFilter = ({ selectedAllergens, onChange }: Props) => {
  return (
    <div className="space-y-2 w-fit">
      <h2 className="font-semibold">{`Allergens (Does not contain)`}</h2>
      {dishAllergens.map((allergens) => (
        <label
          key={allergens}
          className="flex items-center gap-1 w-fit cursor-pointer"
        >
          <input
            type="checkbox"
            className="checkbox"
            value={allergens}
            checked={selectedAllergens.includes(allergens)}
            onChange={onChange}
          />
          <span className="">{allergens}</span>
        </label>
      ))}
    </div>
  );
};

export default AllergensFilter;
