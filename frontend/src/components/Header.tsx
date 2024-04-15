import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton.tsx";
import { useAppContext } from "../context/AppContext.tsx";
import SearchBar from "./SearchBar.tsx";
import { useEffect, useState } from "react";

const Header = () => {
  const { isUserLoggedIn } = useAppContext();

  const MAXWINDOWSIZE = 768;

  const [isMobile, setisMobile] = useState(window.innerWidth < MAXWINDOWSIZE);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth < MAXWINDOWSIZE && setisMobile(true)
    );
    window.addEventListener(
      "resize",
      () => window.innerWidth > MAXWINDOWSIZE && setisMobile(false)
    );
  }, []);
  return (
    <>
      {isMobile ? (
        <div className="bg-white sticky top-0 z-50 flex items-center ">
          <div className="flex flex-col w-full items-center">
            <div className="flex h-16 items-center justify-between w-full px-4">
              <span className="text-3xl font-bold tracking-tight text-teal">
                <Link to="/" className="">
                  RecipeApp
                </Link>
              </span>
              <div className="flex h-full">
                {isUserLoggedIn ? (
                  <div className="flex h-full font-semibold items-center gap-2">
                    <div className="flex h-full">
                      <Link
                        className="flex h-full items-center px-2 hover:bg-stone-100 hover:border-b"
                        to={"/create-dish"}
                      >
                        Create dish
                      </Link>
                      <Link
                        className="flex items-center px-2 hover:bg-stone-100 hover:border-b"
                        to={"/my-dishes"}
                      >
                        My dishes
                      </Link>
                    </div>

                    <LogoutButton />
                  </div>
                ) : (
                  <div className="flex font-semibold items-center gap-2">
                    <div className="flex">
                      <Link
                        className="flex items-center px-2 h-20 hover:bg-stone-100 hover:border-b"
                        to={"/register"}
                      >
                        Register
                      </Link>
                      <Link
                        className="flex items-center px-2 h-20 hover:bg-stone-100 hover:border-b"
                        to={"/login"}
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-stone-200 w-full pb-[2px]">
              <SearchBar classNames="rounded-none w-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white h-20 sticky top-0 z-50 flex items-center shadow">
          <div className="container mx-auto flex justify-between items-center">
            <span className="text-3xl font-bold tracking-tight text-teal">
              <Link to="/" className="">
                RecipeApp
              </Link>
            </span>
            <SearchBar />
            <div className="flex">
              {isUserLoggedIn ? (
                <div className="flex font-semibold items-center">
                  <Link
                    className="flex items-center px-2 h-20 hover:bg-stone-100"
                    to={"/create-dish"}
                  >
                    Create dish
                  </Link>
                  <Link
                    className="flex items-center px-2 h-20 hover:bg-stone-100"
                    to={"/my-dishes"}
                  >
                    My dishes
                  </Link>
                  <LogoutButton />
                </div>
              ) : (
                <div className="flex font-semibold items-center">
                  <Link
                    className="flex items-center px-2 h-20 hover:bg-stone-100"
                    to={"/register"}
                  >
                    Register
                  </Link>
                  <Link
                    className="flex items-center px-2 h-20 hover:bg-stone-100"
                    to={"/login"}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
