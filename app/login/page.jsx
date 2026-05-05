"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    // const data = {
    //     name: e.target.name.value,
    //     email: e.target.email.value,
    //     password: e.target.password.value
    // }

    //   const {data, error} = authClient.signUp({
    //  ...userData
    // })

    const { error } = await authClient.signIn.email(
      {
        email: userData.email,
        password: userData.password,
        // callbackURL: "/auth-success",
      },
      redirect('/')
    );

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  
  
    const handleSignInWithGoogle = async () => {
      await authClient.signIn.social({
      provider: "google",
    },)
    redirect('/')
  
    };
    

  

  return (
    <div className="max-w-4xl mx-auto my-20">
      <h1 className="text-3xl font-bold text-center ">Welcome Back</h1>
      <p className="text-center mb-10">Resume your adventure with Wanderlust</p>
      <Card className=" border rounded-none p-10">
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <div className="flex gap-2 flex-col justify-center items-center">
            <Button type="submit" className={"bg-cyan-500 rounded-none w-full"}>
              <FiCheck />
              Submit
            </Button>
            {/* <Button type="reset" variant="secondary">
              Reset
            </Button> */}
          </div>
        </Form>

        <div className="flex justify-center items-center gap-4">
          <Separator />
          Or
          <Separator />
        </div>

        <Button
          onClick={handleSignInWithGoogle}
          type="button"
          variant="outline"
          className={"w-full rounded-none"}
        >
          {" "}
          <FcGoogle /> Sign In with Google
        </Button>

        <p className="text-sm text-center">
          Don&apos;t have an account? <Link className="text-cyan-500" href={"/signup"}>
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
