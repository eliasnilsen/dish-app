import { dishSpiceLevel } from "../misc/utils";

type Props = {
  selectedSpiceLevel: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SpiceLevelFilter = ({ selectedSpiceLevel, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Spice</h2>
      {dishSpiceLevel.map((spiceLevel) => (
        <label
          key={spiceLevel}
          className="flex items-center gap-1 w-fit cursor-pointer"
        >
          <input
            type="checkbox"
            className="checkbox"
            value={spiceLevel}
            checked={selectedSpiceLevel.includes(spiceLevel)}
            onChange={onChange}
          />
          <span>{spiceLevel}</span>
        </label>
      ))}
    </div>
  );
};

export default SpiceLevelFilter;
