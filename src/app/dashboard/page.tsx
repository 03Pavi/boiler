"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/molecules/table";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AlertDemo } from "@/components/ui/molecules/Alert";
import Navbar from "@/components/ui/molecules/header";
export default function TableDemo() {
  const [todos, setTodo] = useState([]);
  const [err, setError] = useState(false);
  const [errText, setErrorText] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          await axios
            .get(`api/todo`)
            .then((res: any) => {
              setError(false);
              setTodo(res.data.data);
            })
            .catch((err) => {
              if (err.response?.data.message === "Token Expired") {
                setError(true);
                setErrorText(err.response?.data.message);
                router.push("/");
              } else {
                setError(true);
                setErrorText(err.response?.data.message);
              }
            });
        }
      } catch (error) {
        console.error("Something went Wrong!");
      }
    };
    fetchData();

    const timer = setTimeout(() => {
      setError(false);
      setErrorText("");
    }, 2000);
    // Cleanup the timer to prevent memory leks
    return () => clearTimeout(timer);
  }, []);

  return (
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
  );
}
