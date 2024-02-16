"use client";
import React, { useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AlertDemo } from "@/ui/molecules/Alert";
import Navbar from "@/ui/molecules/header";
import Loading from "../loading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/molecules/table";
export default function TableDemo() {
  const [todos, setTodo] = useState([]);
  const [err, setError] = useState(false);
  const [errText, setErrorText] = useState("");
  const [bool, setBool] = useState(true);
  const router = useRouter();
  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const res = await axios.get(`api/todo`);
          setTodo(res.data.data);
          setBool(false);
        } else {
          router.push("/");
        }
      } catch (error: any) {
        if (error.response?.data.message === "Token Expired") {
          setError(true);
          setBool(false);
          Cookies.remove("token");
          setErrorText(error.response?.data.message);
        } else {
          setError(true);
          setBool(false);
          setErrorText(error.response?.data.message);
        }
      }
    };
    fetchData();
    const timer = setTimeout(() => {
      setError(false);
      setErrorText("");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {bool ? (
        <Loading />
      ) : (
        <div className="container mx-auto">
          <Navbar />
          {err && <AlertDemo error={errText} />}
          <Table>
            <TableCaption>A list of your recent Todos.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sr no.</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todos?.length > 0 ? (
                todos.map((i: { text: string }, id) => (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{id + 1}</TableCell>
                    <TableCell>{i?.text}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    List is empty
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
