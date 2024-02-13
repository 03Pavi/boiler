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
export default function TableDemo() {
  const [todos, setTodo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          await axios
            .get(`api/todo`)
            .then((res: any) => {
              setTodo(res.data.data);
            })
            .catch((err) => {
              console.error(err?.response?.data?.message);
            });
        }
      } catch {
        console.log("error");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container mx-auto">
      <Table>
        <TableCaption>A list of your recent Todos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sr no.</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.length > 0 ? (
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
