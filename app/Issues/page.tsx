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

const IssuePage = async () => {
  const todo: Todo[] = await getTodo();
  return (
    <div >
      <div className="w-full mx-auto py-2 flex justify-center items-center pr-40 mt-28">
        <ul className="flex gap-6 " >
        {todo.filter(todoItem => todoItem.status).map(todoItem => (
          <ToDoItems key={todoItem.id} {...todoItem} />
        ))}
        </ul>
      </div>
      <Button><Link href="/Issues/new">New Issue</Link></Button>
    </div>
  );
};

export default IssuePage;
