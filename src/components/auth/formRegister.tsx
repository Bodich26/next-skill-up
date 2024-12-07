"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { registerUser } from "../../../services/auth";

import { Button, Input, Select } from "@/components/ui";
import { Container } from "@/components/shared";
import {
  Form,
  FormControl,
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
import { FormError } from "./formError";
import { FormSuccess } from "./formSuccess";
import { RegisterSchema } from "./registerSchema";

interface IProps {
  switchForm: () => void;
}

export const FormRegister: React.FC<IProps> = ({ switchForm }) => {
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();
  const createAccount = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmitCreateAccount = async (
    values: z.infer<typeof RegisterSchema>
  ) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await registerUser({
          role: values.role,
          name: values.name,
          email: values.email,
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        });

        if (response.message) {
          setSuccess(response.message);
          router.push("/dashboard");
        } else {
          setError(response.error || "Register failed.");
          setSuccess("");
        }
      } catch (error: any) {
        setError("An unexpected error occurred.");
      }
    });
  };

  return (
    <section key="register-form" className="flex items-center justify-center">
      <Container>
        <div className="pt-40 pb-60">
          <Form {...createAccount}>
            <form
              className=" flex flex-col gap-4 p-4 border-[1px] border-solid border-input bg-card rounded-lg"
              onSubmit={createAccount.handleSubmit(handleSubmitCreateAccount)}
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
                  onClick={switchForm}
                >
                  Login to Account
                </p>
              </div>
              <FormField
                name="role"
                control={createAccount.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Role
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FRONT_END">Front-End</SelectItem>
                          <SelectItem value="BACK_END">Back-End</SelectItem>
                          <SelectItem value="UI_UX_DESIGN">
                            Ui/Ux Designer
                          </SelectItem>
                          <SelectItem value="CG_ARTIST">CG-Artist</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="name"
                control={createAccount.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          className="w-80 h-10"
                          placeholder="your name"
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
                name="email"
                control={createAccount.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
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
                          disabled={isPending}
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
                          disabled={isPending}
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
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                className=" mt-[10px]"
                type="submit"
                onClick={() => console.log("fff")}
              >
                Create
              </Button>
            </form>
          </Form>
        </div>
      </Container>
    </section>
  );
};
