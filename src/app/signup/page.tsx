"use client";

import { Button } from "@/components/ui/atom/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/atom/card";
import { Input } from "@/components/ui/atom/input";
import { Label } from "@/components/ui/atom/label";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignUpAccount() {
  const [user, setUser] = useState({
    email: "",
  });
  const router = useRouter();
  const handleRegister = async () => {
    try {
      if (user.email !== "") {
        await axios
          .post("/api/user", { username: user.email })
          .then((res) => {
            alert(res.data.message);
          })
          .then((res) => {
            router.push("/");
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      } else {
        alert("username is required");
      }
    } catch (err) {
      console.log("some error occured");
    }
  };
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign up</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to register
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleRegister}>
              Register
            </Button>
            <p className="mt-2 text-xs text-center text-gray-700">
              Have an account?{" "}
              <span className=" text-blue-600 hover:underline">
                <Link href="/">Sign in</Link>
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
