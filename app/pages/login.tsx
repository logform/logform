import Button from "@/components/auth/Button";
import Input from "@/components/auth/Input";
import AuthLayout from "@/layouts/AuthLayout";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <AuthLayout authType="login" onSubmit={handleLogin}>
      <Input
        onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
        placeholder="example@mail.com"
        text="What's your email?"
        type="email"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Shh...it's a secret"
        text="What's your password?"
        type="password"
      />
      <Button text="Login" disabled={!email || !password} loading={loading} />
    </AuthLayout>
  );
};

export default Login;
