import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import CreateDish from "./pages/CreateDish.tsx";
import { useAppContext } from "./context/AppContext.tsx";
import MyDishes from "./pages/MyDishes.tsx";
import EditDish from "./pages/EditDish.tsx";
import Search from "./pages/Search.tsx";

function App() {
  const { isUserLoggedIn } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        {isUserLoggedIn && (
          <>
            <Route
              path="/create-dish"
              element={
                <Layout>
                  <CreateDish />
                </Layout>
              }
            />
            <Route
              path="/edit-dish/:dishId"
              element={
                <Layout>
                  <EditDish />
                </Layout>
              }
            />
            <Route
              path="/my-dishes"
              element={
                <Layout>
                  <MyDishes />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
