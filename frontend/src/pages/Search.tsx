import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import DishSearchFieldCard from "../components/DishSearchFieldCard";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/CategoryFilter";
import SpiceLevelFilter from "../components/SpiceLevelFilter";
import PrepTimeFilter from "../components/PrepTimeFilter";
import AllergensFilter from "../components/AllergensFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string[]>([]);
  const [selectedPrepTime, setSelectedPrepTime] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    name: search.name,
    page: page.toString(),
    category: selectedCategories,
    spiceLevel: selectedSpiceLevel,
    prepTime: selectedPrepTime,
    allergens: selectedAllergens,
    sortOption,
  };

  const { data: dishData } = useQuery(["searchDishes", searchParams], () =>
    apiClient.searchDishes(searchParams)
  );

  const handleCategoriesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedCategories = event.target.value;

    setSelectedCategories((prevCategories) =>
      event.target.checked
        ? [...prevCategories, selectedCategories]
        : prevCategories.filter((category) => category !== selectedCategories)
    );
  };

  const handleSpiceLevelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedSpiceLevel = event.target.value;

    setSelectedSpiceLevel((prevSpiceLevel) =>
      event.target.checked
        ? [...prevSpiceLevel, selectedSpiceLevel]
        : prevSpiceLevel.filter(
            (spiceLevel) => spiceLevel !== selectedSpiceLevel
          )
    );
  };

  const handlePrepTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPrepTime = event.target.value;

    setSelectedPrepTime((prevPrepTime) =>
      event.target.checked
        ? [...prevPrepTime, selectedPrepTime]
        : prevPrepTime.filter((prepTime) => prepTime !== selectedPrepTime)
    );
  };

  const handleAllergensChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedAllergens = event.target.value;

    setSelectedAllergens((prevAllergens) =>
      event.target.checked
        ? [...prevAllergens, selectedAllergens]
        : prevAllergens.filter((allergens) => allergens !== selectedAllergens)
    );
  };

  return (
    <div className="grid grid-cols-3 lg:grid-cols-8 gap-2">
      <div className="col-span-1 lg:col-span-2 p-4 sticky top-24 h-fit max-h-[calc(100dvh-7rem)] border rounded-md overflow-y-scroll overscroll-auto">
        <div className="space-y-4">
          <CategoryFilter
            selectedCategories={selectedCategories}
            onChange={handleCategoriesChange}
          />
          <SpiceLevelFilter
            selectedSpiceLevel={selectedSpiceLevel}
            onChange={handleSpiceLevelChange}
          />
          <PrepTimeFilter
            selectedPrepTime={selectedPrepTime}
            onChange={handlePrepTimeChange}
          />
          <AllergensFilter
            selectedAllergens={selectedAllergens}
            onChange={handleAllergensChange}
          />
        </div>
      </div>
      <div className="col-span-2 lg:col-span-6 p-2 gap-2 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">
            {dishData?.pagination.total} dishes found.
          </h2>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="bg-white border py-1 px-2 rounded-md"
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="spiceLevelDes">Spice level (low to high)</option>
            <option value="spiceLevelAsc">Spice level (high to low)</option>
            <option value="prepTimeDes">Prep time (low to high)</option>
            <option value="prepTimeAsc">Prep time (high to low)</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {dishData?.data.map((dish) => (
            <DishSearchFieldCard key={dish._id} dish={dish} />
          ))}
        </div>
        {dishData?.pagination.total && (
          <Pagination
            page={dishData?.pagination.page || 1}
            pages={dishData?.pagination.pages || 1}
            onPageChange={(pageNumber) => setPage(pageNumber)}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
