import Header from "./Header";
import Footer from "./Footer";
import AppContextProvider from "../context/AppContext";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <AppContextProvider>
      <div className="flex flex-col min-h-screen select-none bg-stone-100">
        <Header />
        <div className="mx-auto py-4 flex-1 container">{children}</div>
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default Layout;
