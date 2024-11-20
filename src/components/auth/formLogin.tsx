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
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormError } from "./formError";
import { FormSuccess } from "./formSuccess";

interface IProps {
  switchForm: () => void;
}

const loginForm = z.object({
  emailAddress: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(3, {
    message: "Password is required",
  }),
});

export const FormLogin: React.FC<IProps> = ({ switchForm }) => {
  const router = useRouter();

  const login = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const handleSubmitLogin = async (values: z.infer<typeof loginForm>) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: values.emailAddress,
        password: values.password,
      });

      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        console.error(response.data.error || "Login failed");
      }
    } catch (error: any) {
      console.error(error.response?.data?.error || "Login failed");
    }
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
              <FormField
                name="emailAddress"
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
                          placeholder="******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormError message="" />
              <FormSuccess message="" />
              <Button
                className=" mt-[10px]"
                type="submit"
                onClick={() => console.log("fff")}
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </Container>
    </section>
  );
};
