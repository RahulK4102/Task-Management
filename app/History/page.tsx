import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/prisma/client";
import { Issue } from "@prisma/client";
import ToDoItems from "@/components/ToDoItems";

// Define the type for todo
type Todo = Issue; // Adjust this according to the actual type of your Issue

function getTodo(): Promise<Todo[]> {
  return prisma.issue.findMany();
}

const Page = async () => {
  const todo: Todo[] = await getTodo();
  return (
    <div>
      <div className="w-fullmx-auto py-2 flex justify-center items-center pr-40 mt-28">
        <ul className="">
          {todo.map(todoItem => (
            <ToDoItems key={todoItem.id} {...todoItem} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
