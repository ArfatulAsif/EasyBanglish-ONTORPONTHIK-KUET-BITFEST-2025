import { Button, Input, Link } from "@nextui-org/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";

const Login = ({ setSelected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const user = await loginUser(email, password);
    setIsLoading(false);

    if (user) {
      navigate(from, { replace: true });
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <Input
        name="email"
        isRequired
        label="Email"
        placeholder="Enter your email"
        type="email"
      />
      <Input
        name="password"
        isRequired
        label="Password"
        placeholder="Enter your password"
        type="password"
      />
      <p className="text-center text-small">
        Need to create an account?{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected("sign-up")}
        >
          Sign up
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          type="submit"
          fullWidth
          color="primary"
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
