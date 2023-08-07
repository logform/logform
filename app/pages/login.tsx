import Button from "@/components/auth/Button";
import Input from "@/components/auth/Input";
import AuthLayout from "@/layouts/AuthLayout";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });
      console.log(data);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
