"use client";
import React from "react";
import { useForm } from "react-hook-form";
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
import { ResetSchema } from "./schemas";
import { reset } from "@/app/api/auth/reset/route";
import { resetPassword, sendPasswordResetEmail } from "../../../services/auth";

interface IProps {}

export const ResetForm: React.FC<IProps> = () => {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const resetForm = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await sendPasswordResetEmail(values);
        if ("success" in response) {
          if (typeof response.success === "boolean") {
            setSuccess("Письмо для сброса пароля успешно отправлено!");
          } else {
            setSuccess(response.success);
          }
        } else {
          setError(response.error || "Что-то пошло не так!");
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
                <h1 className=" text-3xl font-bold">Forgot your password?</h1>
                <p className="opacity-50">
                  Enter your email address and password
                </p>
              </div>
              <div>
                <p className="opacity-50 cursor-pointer text-center hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <Link href="/auth/login">Back to Login</Link>
                </p>
              </div>
              <FormField
                name="email"
                control={resetForm.control}
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
                Send reset email
              </Button>
            </form>
          </Form>
        </div>
      </Container>
    </section>
  );
};
