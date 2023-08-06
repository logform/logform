import Button from "@/components/auth/Button";
import AuthLayout from "@/layouts/AuthLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Resend = () => {
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const router = useRouter();
  useEffect(() => {
    if (router.query.token) {
      (async () => {
        try {
          await axios.get(`/api/auth/check-token?tkn=${router.query.token}`);
          setIsPageLoading(false);
          setIsTokenValid(true);
        } catch (error: any) {
          setIsPageLoading(false);
        }
      })();
    }
  }, [router.query.token]);

  return (
    <>
      {isPageLoading ? (
        <div className="h-screen flex items-center justify-center flex-col">
          <h1 className="animate-pulse font-bold text-5xl text-center">
            Logform
          </h1>
          {/* <div className="w-52 h-1 bg-black/20 mt-4">
            <div className={`w-[${width}%] h-full bg-black`}></div>
          </div> */}
        </div>
      ) : (
        <>
          {isTokenValid ? (
            <AuthLayout authType="resend" onSubmit={handleResend}>
              <div className="flex items-center justify-center flex-col">
                <p className="text-center text-lg font-medium text-gray-500">
                  Click the button below to request a new verification email
                </p>
                <Button text="Resend" loading={loading} disabled={loading} />
              </div>
            </AuthLayout>
          ) : (
            <div className="h-screen flex items-center justify-center flex-col">
              <h1>Invalid verification token</h1>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Resend;
