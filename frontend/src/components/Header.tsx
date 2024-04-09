import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton.tsx";
import { useAppContext } from "../context/AppContext.tsx";
import SearchBar from "./SearchBar.tsx";

const Header = () => {
  const { isUserLoggedIn } = useAppContext();
  return (
    <div className="bg-white h-20 sticky top-0 z-50 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl font-bold tracking-tight text-teal">
          <Link to="/" className="">
            RecipeApp
          </Link>
        </span>
        <SearchBar />
        <div className="flex ">
          {isUserLoggedIn ? (
            <div className="flex gap-2 font-semibold items-center">
              <Link
                className="px-2 py-1 rounded hover:text-teal"
                to={"/create-dish"}
              >
                Create dish
              </Link>
              <Link
                className="px-2 py-1 rounded hover:text-teal"
                to={"/my-dishes"}
              >
                My dishes
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex gap-2 font-semibold">
              <Link
                className="px-2 py-1 rounded hover:text-teal"
                to={"/register"}
              >
                Register
              </Link>
              <Link className="px-2 py-1 rounded hover:text-teal" to={"/login"}>
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
