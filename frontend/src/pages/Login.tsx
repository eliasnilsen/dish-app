import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { isUserLoggedIn } = useAppContext();
  const navigate = useNavigate();
  if (isUserLoggedIn) {
    navigate("/");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
