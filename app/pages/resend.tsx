import AuthLayout from "@/layouts/AuthLayout";

const Resend = () => {
  const handleResend = () => {};
  return (
    <AuthLayout authType="resend" onSubmit={handleResend}>
      <p className="text-center text-lg font-medium text-gray-500">
        Click the button below to request a new verification email
      </p>
    </AuthLayout>
  );
};

export default Resend;
