"use client";

import { useCallback, useEffect, useState } from "react";
import { Container } from "../shared";
import { Button } from "../ui";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/app/api/auth/newVerification/route";
import { FormSuccess } from "./formSuccess";
import { FormError } from "./formError";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      const response = await newVerification(token);
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.success);
      } else {
        setError(data.error);
      }
    } catch (e) {
      setError("Something went wrong!");
    }
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <section key="login-form" className="flex items-center justify-center">
      <Container>
        <div className="flex flex-col gap-4 p-4 border-[1px] border-solid border-input bg-card rounded-lg mt-[300px]">
          <p className="text-lg font-bold">Confirming your verification!</p>
          <div className=" flex flex-col items-center gap-4 mt-[10px] mb-[5px]">
            {!success && !error && <BarLoader color="#6d28d9" />}
            <FormSuccess message={success} />
            {!success && <FormError message={error} />}
            <p className="opacity-50">Please wait Loading</p>
          </div>
          <Button
            variant="secondary"
            type="button"
            onClick={() => router.push("/auth/login")}
          >
            Back to Login
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default NewVerificationForm;
