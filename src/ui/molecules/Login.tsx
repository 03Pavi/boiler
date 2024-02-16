"use client";
import { Button } from "@/ui/atom/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/atom/card";
import { Input } from "@/ui/atom/input";
import { Label } from "@/ui/atom/label";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
export default function LoginAccount() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const isCookie = Cookies.get("token");
    if (isCookie) {
      router.push("/dashboard");
    }
  }, []);
  const router = useRouter();
  const handleLogin = async () => {
    try {
      if (user.email !== "") {
        await axios
          .post(`/api/user/signin`, {
            username: user.email,
            password: user.password,
          })
          .then((res) => {
            alert(res.data.message);
            router.push("/dashboard");
          })
          .catch((err) => {
            alert(err.response.data.message);
            router.push("/");
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
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">username</Label>
              <Input
                id="username"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder=""
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>
            <p className="mt-2 text-xs text-center text-gray-700">
              Don't have an account?{" "}
              <span className=" text-blue-600 hover:underline">
                <Link href="/signup">Sign up</Link>
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
