import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/prisma/client";
import { Issue } from "@prisma/client";
import ToDoItems from "@/components/ToDoItems";
import Navbar from "@/components/Navbar";


type Todo = Issue; 

function getTodo(): Promise<Todo[]> {
  return prisma.issue.findMany();
}

const IssuePage = async ({ params }: { params: { id: string } }) => {
  const {id} = params;


  console.log(id);
  const todo: Todo[] = await getTodo();
  return (
    <div className="min-h-screen bg-gray-100 mt-24">
      <Navbar id={id} />
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Open Issues</h1>
        </div>
        <div className="flex justify-center">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {todo.filter(todoItem => todoItem.status === "Open").map(todoItem => (
              <ToDoItems key={todoItem.id} {...todoItem} ProfileID={id} />
            ))}
          </ul>
        </div>
        <div className="flex justify-center mt-8">
          <Button>
            <Link href="/Issues/new/" >
              New Issue
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssuePage;
