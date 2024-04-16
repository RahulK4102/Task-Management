import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/prisma/client"; 
import { Issue } from "@prisma/client";
import ToDoItems from "@/components/ToDoItems";
type Todo = Issue; // Adjust this according to the actual type of your Issue

function getTodo(): Promise<Todo[]> {
  return prisma.issue.findMany();
}
export default async function Home() {
  const todo: Todo[] = await getTodo();
  return (
    <div >
      <div className="w-full mx-auto py-2 flex justify-center items-center pr-40 mt-28">
        <ul className="flex gap-6 " >
        {todo.filter(todoItem => todoItem.status === "In_Progress").map(todoItem => (
          <ToDoItems key={todoItem.id} {...todoItem} />
        ))}
        </ul>
      </div>
    </div>
  );
  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      
  //   </main>
  // );
}
