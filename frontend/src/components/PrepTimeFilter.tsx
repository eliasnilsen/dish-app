import { dishPrepTime } from "../misc/utils";

type Props = {
  selectedPrepTime: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PrepTimeFilter = ({ selectedPrepTime, onChange }: Props) => {
  return (
    <div className="space-y-2 w-fit">
      <h2 className="font-semibold">Preperation time</h2>
      {dishPrepTime.map((prepTime) => (
        <label
          key={prepTime}
          className="flex items-center gap-1 w-fit cursor-pointer"
        >
          <input
            type="checkbox"
            className="checkbox"
            value={prepTime}
            checked={selectedPrepTime.includes(prepTime)}
            onChange={onChange}
          />
          <span>{prepTime}</span>
        </label>
      ))}
    </div>
  );
};

export default PrepTimeFilter;
