import Button from "@/components/auth/Button";
import Input from "@/components/auth/Input";
import AuthLayout from "@/layouts/AuthLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const Complete = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleComplete = async () => {
    setLoading(true);
    try {
      await axios.put("/api/auth/complete", {
        name,
      });
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout authType="complete" onSubmit={handleComplete}>
      <Input
        onChange={(e) => setName(e.target.value.trim())}
        placeholder="First or nick name"
        text="What's your name?"
        type="text"
      />
      <Button text="Complete" disabled={!name} loading={loading} />
    </AuthLayout>
  );
};

export default Complete;
