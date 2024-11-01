"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Input, Select } from "@/components/ui";
import { Container } from "@/components/shared";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const regForm = z
  .object({
    emailAddress: z.string().email(),
    nickName: z.string().min(3),
    accountType: z.enum([
      "Front-End",
      "Back-End",
      "Ui/Ux Designer",
      "CG-Artist",
    ]),
    password: z.string().min(3),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    { message: "Password do not match", path: ["passwordConfirm"] }
  );

const loginForm = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(3),
});

export default function login() {
  const [switchForm, setSwitchForm] = React.useState<boolean>(true);

  const createAccount = useForm<z.infer<typeof regForm>>({
    resolver: zodResolver(regForm),
    defaultValues: {
      nickName: "",
      emailAddress: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmitCreateAccount = (values: z.infer<typeof regForm>) => {
    console.log({ values });
  };

  const login = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const handleSubmitLogin = (values: z.infer<typeof loginForm>) => {
    console.log({ values });
  };

  return (
    <>
      {switchForm ? (
        <section key="login-form" className="flex items-center justify-center">
          <Container>
            <div className="pt-40 pb-60">
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
                      onClick={() => setSwitchForm(false)}
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
                              placeholder=""
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <Button className=" mt-[10px]" type="submit">
                    Login
                  </Button>
                </form>
              </Form>
            </div>
          </Container>
        </section>
      ) : (
        <section
          key="register-form"
          className="flex items-center justify-center"
        >
          <Container>
            <div className="pt-40 pb-60">
              <Form {...createAccount}>
                <form
                  className=" flex flex-col gap-4 p-4 border-[1px] border-solid border-input bg-card rounded-lg"
                  onSubmit={createAccount.handleSubmit(
                    handleSubmitCreateAccount
                  )}
                >
                  <div className="max-w-80 flex flex-col gap-3">
                    <h1 className=" text-3xl font-bold">Create an account</h1>
                    <p className=" opacity-50">
                      Complete all fields below to create an account
                    </p>
                  </div>
                  <div>
                    <p
                      className="opacity-50 cursor-pointer text-center hover:opacity-100 transition-opacity duration-300 ease-in-out"
                      onClick={() => setSwitchForm(true)}
                    >
                      Login to Account
                    </p>
                  </div>
                  <FormField
                    name="accountType"
                    control={createAccount.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">
                            Role
                          </FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Front-End">
                                Front-End
                              </SelectItem>
                              <SelectItem value="Back-End">Back-End</SelectItem>
                              <SelectItem value="Ui/Ux Designer">
                                Ui/Ux Designer
                              </SelectItem>
                              <SelectItem value="CG-Artist">
                                CG-Artist
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    name="nickName"
                    control={createAccount.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">
                            Nick
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-80 h-10"
                              placeholder="your nick"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    name="emailAddress"
                    control={createAccount.control}
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
                    control={createAccount.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-80 h-10"
                              placeholder=""
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={createAccount.control}
                    name="passwordConfirm"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">
                            Password Confirm
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-80 h-10"
                              placeholder=""
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <Button className=" mt-[10px]" type="submit">
                    Create
                  </Button>
                </form>
              </Form>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
