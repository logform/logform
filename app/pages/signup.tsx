import Button from "@/components/auth/Button";
import Input from "@/components/auth/Input";
import AuthLayout from "@/layouts/AuthLayout";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignupSuccessfull, setIsSignupSuccessfull] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/signup", {
        email,
        password,
        repeatPassword,
      });
      setIsSignupSuccessfull(true);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout authType="signup" onSubmit={handleSignup}>
      {isSignupSuccessfull ? (
        <h1>An email has been sent to verify your email.</h1>
      ) : (
        <>
          <Input
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            placeholder="example@mail.com"
            text="What's your email?"
            type="email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Shh...it's a secret"
            text="Choose a password"
            type="password"
          />
          <Input
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="•••••••••••••••••••"
            text="Enter your password again"
            type="password"
          />
          <Button
            text="Signup"
            disabled={!email || !password}
            loading={loading}
          />
        </>
      )}
    </AuthLayout>
  );
};

export default Signup;
