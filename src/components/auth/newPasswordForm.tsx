"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { Container } from "@/components/shared";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "./formError";
import { FormSuccess } from "./formSuccess";
import { NewPasswordSchema } from "./schemas";
import { resetPassword } from "../../../services/auth";

interface IProps {}

export const NewPasswordForm: React.FC<IProps> = () => {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const resetForm = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    if (!token) {
      setError("Token is missing");
      return;
    }

    startTransition(async () => {
      try {
        const response = await resetPassword(values.password, token);

        if (response.success) {
          setSuccess(response.success);
        } else {
          setError(response.error || "Something went wrong!");
        }
      } catch (e) {
        setError("Something went wrong!");
      }
    });
  };

  return (
    <section key="reset-form" className="flex items-center justify-center">
      <Container>
        <div className="pt-40 pb-10">
          <Form {...resetForm}>
            <form
              className=" flex flex-col gap-4 p-4 border-[1px] border-solid border-input bg-card rounded-lg"
              onSubmit={resetForm.handleSubmit(onSubmit)}
            >
              <div className="max-w-85 flex flex-col gap-3">
                <h1 className=" text-3xl font-bold">Password recovery</h1>
                <p className="opacity-50">Enter your a new password</p>
              </div>
              <div>
                <p className="opacity-50 cursor-pointer text-center hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <Link href="/auth/login">Back to Login</Link>
                </p>
              </div>
              <FormField
                name="password"
                control={resetForm.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-80 h-10"
                          placeholder="***"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button disabled={isPending} className=" mt-[10px]" type="submit">
                Reset Password
              </Button>
            </form>
          </Form>
        </div>
      </Container>
    </section>
  );
};
