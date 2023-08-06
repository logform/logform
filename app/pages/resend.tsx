import Button from "@/components/auth/Button";
import AuthLayout from "@/layouts/AuthLayout";
import { useState } from "react";

const Resend = () => {
  const [loading, setLoading] = useState(false);

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <AuthLayout authType="resend" onSubmit={handleResend}>
      <div className="flex items-center justify-center flex-col">
        <p className="text-center text-lg font-medium text-gray-500">
          Click the button below to request a new verification email
        </p>
        <Button text="Resend" loading={loading} disabled={loading} />
      </div>
    </AuthLayout>
  );
};

export default Resend;
