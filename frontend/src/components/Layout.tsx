import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import AppContextProvider from "../context/AppContext";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <AppContextProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
        <div className="container mx-auto py-10 flex-1">{children}</div>
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default Layout;
