import Link from "next/link";
import { prisma } from "@/prisma/client";
import { Issue } from "@prisma/client";
import ToDoItems from "@/components/ToDoItems";
import Navbar from "@/components/Navbar";


type Todo = Issue; 

async function getTodo(): Promise<Todo[]> {
  return prisma.issue.findMany();
}

const Page = async () => {
  const todo: Todo[] = await getTodo();
  return (
    <div className="min-h-screen bg-gray-100 mt-24">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">To-Do List</h1>
        <div className="flex justify-center">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {todo.map(todoItem => (
              <ToDoItems key={todoItem.id} {...todoItem} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
