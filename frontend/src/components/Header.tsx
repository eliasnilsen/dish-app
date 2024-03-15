import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton.tsx";
import { useAppContext } from "../context/AppContext.tsx";

const Header = () => {
  const { isUserLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between text-white items-center">
        <span className="text-3xl font-bold tracking-tight">
          <Link to="/">RecipeApp</Link>
        </span>
        <div>
          {isUserLoggedIn ? (
            <>
              <LogoutButton />
            </>
          ) : (
            <div className="flex gap-2 font-semibold">
              <Link
                className="px-2 py-1 rounded hover:underline"
                to={"/register"}
              >
                Register
              </Link>
              <Link className="px-2 py-1 rounded hover:underline" to={"/login"}>
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
