import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

const Auth = () => {
  const [selected, setSelected] = useState("login");

  return (
    <div>
      <div className="flex flex-col w-full dark">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              aria-label="Tabs form"
              selectedKey={selected}
              size="md"
              onSelectionChange={setSelected}
            >
              <Tab key="login" title="Login">
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key="sign-up" title="Sign up">
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
