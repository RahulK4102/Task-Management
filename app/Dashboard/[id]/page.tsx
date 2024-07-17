
import { NextRequest, NextResponse } from "next/server";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { prisma } from "@/prisma/client"; 
import Navbar from "@/components/Navbar";
import { Issue, User } from "@prisma/client";
import ToDoItems from "@/components/ToDoItems";
type Todo = Issue;
type Users = User;

function getTodo(id:string): Promise<Todo[]> {
  return prisma.issue.findMany({
    where:{
      createdById:parseInt(id,10)
    }
  });
}
function getUser(id: string){
  return prisma.user.findMany({
    where: {
      id: parseInt(id, 10)
    },
    select: {
      name: true
    }
  });
}

export default async function Page({ params }: { params: { id: string } }) {
  const {id} = params;

  const todo: Todo[] = await getTodo(id);
  const users = await getUser(id);

  // console.log(todo);
  // console.log(users);
  const todoAndTodo1 = [...users,...todo];
  console.log(todoAndTodo1);

  return (
    <div className="min-h-screen bg-gray-100 mt-24 overflow-hidden ">
      <Navbar id={id} />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">My In-Progress Tasks</h1>
        <div className="flex justify-center">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {todoAndTodo1.filter(item => item.status === "In_Progress").map(item => (
            <ToDoItems key={item.id} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
}
