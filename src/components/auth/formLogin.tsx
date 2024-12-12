"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { LoginSchema } from "./schemas";
import Link from "next/link";
import { postLoginUser } from "@/app/api/auth/login/route";

interface IProps {
  switchForm: () => void;
}

export const FormLogin: React.FC<IProps> = ({ switchForm }) => {
  const [showTwoFactor, setShowTwoFactor] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const login = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitLogin = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await postLoginUser(values);
        const data = await response.json();

        if (data?.error) {
          login.reset();
          setError(data.error);
        }

        if (data.success) {
          login.reset();
          setSuccess(data.success);
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true);
        }
      } catch (err) {
        console.error("Unexpected error during login:", err);
        setError("Something went wrong");
      }
    });
  };

  return (
    <section key="login-form" className="flex items-center justify-center">
      <Container>
        <div className="pt-40 pb-10">
          <Form {...login}>
            <form
              className=" flex flex-col gap-4 p-4 border-[1px] border-solid border-input bg-card rounded-lg"
              onSubmit={login.handleSubmit(handleSubmitLogin)}
            >
              <div className="max-w-80 flex flex-col gap-3">
                <h1 className=" text-3xl font-bold">Login to account</h1>
                <p className="opacity-50 ">
                  Enter your email address and password
                </p>
              </div>
              <div>
                <p
                  className="opacity-50 cursor-pointer text-center hover:opacity-100 transition-opacity duration-300 ease-in-out"
                  onClick={switchForm}
                >
                  Create an Account
                </p>
              </div>
              {showTwoFactor && (
                <FormField
                  name="code"
                  control={login.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          Two Factor Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-80 h-10"
                            placeholder="123456"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
              {!showTwoFactor && (
                <>
                  <FormField
                    name="email"
                    control={login.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-80 h-10"
                              placeholder="m@example.com"
                              type="email"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    name="password"
                    control={login.control}
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
                              disabled={isPending}
                            />
                          </FormControl>
                          <Button
                            className="font-normal"
                            variant="link"
                            size="sm"
                            disabled={isPending}
                          >
                            <Link href="/auth/reset">Forgot password?</Link>
                          </Button>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </>
              )}
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button className=" mt-[10px]" type="submit">
                {showTwoFactor ? "Confirm" : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </Container>
    </section>
  );
};
