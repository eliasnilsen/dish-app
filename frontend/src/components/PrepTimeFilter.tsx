import { dishPrepTime } from "../misc/utils";

type Props = {
  selectedPrepTime: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PrepTimeFilter = ({ selectedPrepTime, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <h2 className="font-bold">Preperation time</h2>
      {dishPrepTime.map((prepTime) => (
        <label
          key={prepTime}
          className="flex items-center gap-1 rounded px-2 w-fit cursor-pointer"
        >
          <input
            type="checkbox"
            className="rounded cursor-pointer"
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
