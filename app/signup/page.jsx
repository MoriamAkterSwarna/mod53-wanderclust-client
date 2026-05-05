"use client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { LuCheck, LuEye, LuEyeOff } from "react-icons/lu";
import { authClient } from "../../lib/auth-client";

const SignUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
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

    const { error } = await authClient.signUp.email(
      {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        /**
         * callbackURL doesn't work on credential signup
         * Issue: https://www.answeroverflow.com/m/1413613749515849878
         */

        // callbackURL: "/auth-success",
      },
      {
        onSuccess: async ({data}) => {

          await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE}/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            
            body: JSON.stringify(data.user),
          });

          router.push("/");
        },
      },
    );

    if (error) {
      toast.error(error.message);
    }
  };

  

  return (
    <div className="max-w-4xl mx-auto mt-20 mb-20">
      <h1 className="text-3xl font-bold text-center ">Create account</h1>
      <p className="text-center mb-10">Start your adventure with Wanderlust</p>
      <Card className=" border rounded-none p-10">
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
          <TextField isRequired name="name" type="text">
            <Label>Full Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>
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
            className="w-full "
            name="password"
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
            <InputGroup>
              <InputGroup.Input
                className="w-full"
                type={isVisible ? "text" : "password"}
                placeholder="Enter password"
              />

              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                      <LuEye className="size-4" />
                  ) : (
                      <LuEyeOff className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <div className="flex gap-2 flex-col justify-center items-center">
            <Button type="submit" className={"bg-cyan-500 rounded-none w-full"}>
              <LuCheck />
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
         
          type="button"
          variant="outline"
          className={"w-full rounded-none"}
        >
          {" "}
          <FcGoogle /> Sign Up with Google
        </Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className="text-cyan-500" href={"/login"}>
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignUpPage;
