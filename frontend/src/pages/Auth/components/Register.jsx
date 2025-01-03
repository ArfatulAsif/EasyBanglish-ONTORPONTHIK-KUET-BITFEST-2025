import { useState } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const Register = ({ setSelected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useContext(AuthContext);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    await registerUser(name, email, password);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 h-[300px]">
      <Input
        name="name"
        isRequired
        label="Name"
        placeholder="Enter your name"
        type="text"
      />
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
        Already have an account?{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected("login")}
        >
          Login
        </Link>
      </p>

      <div className="flex gap-2 justify-end">
        <Button
          isDisabled={isLoading}
          type="submit"
          fullWidth
          color="primary"
          isLoading={isLoading}
        >
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default Register;
