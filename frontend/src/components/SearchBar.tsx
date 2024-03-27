import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
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
      className="flex items-center gap-2 bg-white border rounded-full overflow-hidden py-2 px-4"
    >
      <div className="flex items-center gap-2">
        <button type="submit">
          <LuSearch size={20} className="hover:text-teal" />
        </button>

        <input
          type="text"
          placeholder="Pizzasnurrer..."
          className="w-full focus:outline-none bg-inherit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchBar;
