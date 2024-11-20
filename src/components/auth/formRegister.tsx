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
import axios from "axios";
import { useRouter } from "next/navigation";

interface IProps {
  switchForm: () => void;
}

const regForm = z
  .object({
    emailAddress: z.string().email(),
    name: z.string().min(3),
    accountType: z.enum(["FRONT_END", "BACK_END", "UI_UX_DESIGN", "CG_ARTIST"]),
    password: z.string().min(3),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    { message: "Password do not match", path: ["passwordConfirm"] }
  );

export const FormRegister: React.FC<IProps> = ({ switchForm }) => {
  const router = useRouter();
  const createAccount = useForm<z.infer<typeof regForm>>({
    resolver: zodResolver(regForm),
    defaultValues: {
      name: "",
      emailAddress: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmitCreateAccount = async (values: z.infer<typeof regForm>) => {
    try {
      const response = await axios.post("/api/auth/register", {
        name: values.name,
        email: values.emailAddress,
        password: values.password,
        role: values.accountType,
      });

      if (response.status === 200) {
        router.push("/dashboard");
      } else {
        console.error(response.data.error || "Registration failed");
      }
    } catch (error: any) {
      console.error(error.response?.data?.error || "Registration failed");
    }
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
              <Button
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
