import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { cn } from "../misc/cn";

type Props = {
  classNames?: string | "";
};

const SearchBar = ({ classNames }: Props) => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [name, setName] = useState<string>(search.name);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(name);

    navigate("/search");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-2 bg-stone-100 rounded-full overflow-hidden p-2 w-fit",
        classNames
      )}
    >
      <div className="flex items-center gap-2 px-2 w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full focus:outline-none bg-inherit text-teal font-semibold"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">
          <LuSearch size={20} strokeWidth={3} className="text-teal" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
