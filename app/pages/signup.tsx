import Button from "@/components/auth/Button";
import Input from "@/components/auth/Input";
import AuthLayout from "@/layouts/AuthLayout";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <AuthLayout authType="signup" onSubmit={handleSignup}>
      <Input
        onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
        placeholder="example@mail.com"
        text="What's your email?"
        type="email"
      />
      <Input
        onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
        placeholder="Just your first name"
        text="What's your name?"
        type="email"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Shh...it's a secret"
        text="Choose a password"
        type="password"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="•••••••••••••••••••"
        text="Enter your password again"
        type="password"
      />
      <Button text="Signup" disabled={!email || !password} loading={loading} />
    </AuthLayout>
  );
};

export default Signup;
