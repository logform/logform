import AuthLayout from "@/layouts/AuthLayout";

const Resend = () => {
  const handleResend = () => {};
  return (
    <AuthLayout authType="resend" onSubmit={handleResend}>
      Resend
    </AuthLayout>
  );
};

export default Resend;
