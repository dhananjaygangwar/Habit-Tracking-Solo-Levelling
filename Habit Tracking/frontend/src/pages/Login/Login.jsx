import { useState } from "react";

import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Header from "../../components/Header/Header";

import "./login.css";
import { useAuth } from "../../context/AuthProvider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    login("jwttoken", {"name": "AK"});

};

  return (
    <div className="login-page">
      <Card>
        <Header
          title="SYSTEM AUTHORIZATION"
          subtitle="Identify yourself, Hunter."
        />

        <form className="login-form" onSubmit={handleLogin}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="login-warning">
            ⚠ Unauthorized access will be punished.
          </p>

          <Button>ENTER THE SYSTEM</Button>
        </form>

        <span className="login-status">
          Status: Awaiting authentication…
        </span>
      </Card>
    </div>
  );
}
