"use client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { prisma } from "@/prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
enum Status{
  OPEN,
  IN_PROGRESS,
  CLOSED
}
type TodoItemsProps={
    id: string
    title: string
    description: string
    status: Status
    complete?: boolean
    created :Date
    updated :Date
}


const ToDoItems = ({ id, title, description, status, complete,created,updated }: TodoItemsProps) => {
  const [isAccepted, setIsAccepted] = useState(true);
  const router = useRouter();
  // const handleAccept = async () => {
  //   const userId = `${id}`;
  //   try {
  //     const deletedRecord = await prisma.issue.delete({
  //       where: {
  //         id: parseInt(userId),
  //       },
  //     });
  //     console.log('Deleted record:', deletedRecord);
  //   } catch (error) {
  //     console.log(error);
  //   }
    
  // };
  const handleClose = async () => {
    const userId = `${id}`;
    const ID = parseInt(userId);
    try {
      await axios.delete(`/api/issues?id=${ID}`);
      router.push("/Issues");
    } catch (error) {
      console.error('Error deleting todo item:', error);
    }
  };
  const handleAccept = async () => {
    const userId = `${id}`;
    const ID = parseInt(userId);
    try {
      await axios.put(`/api/issues?id=${ID}`);
      router.push("/Issues");
    } catch (error) {
      console.error('Error deleting todo item:', error);
    }
  };

  return (
    <div className={`bg-white rounded-md shadow-md p-4 mb-4 ${status === 'Closed' ? '' : 'w-52 h-52'}`}>
      <div className="flex flex-col">
        <label htmlFor={id} className="cursor-pointer text-lg font-bold mb-2">
          {title}
        </label>
        <p className="text-gray-700">{description}</p>
        <p className="text-gray-600 mt-2">Status: {status}</p>
        {status === 'Closed' && <p className="text-gray-600 mt-2">CreatedAt: {created.toString()} </p>}
        {status === 'Closed' && <p className="text-gray-600 mt-2">UpdatedAt: {updated.toString()} </p>}
        <div className="flex">
          {status === 'Open' && <Button onClick={handleAccept} >Accept</Button>}
          {status === 'In_Progress' && <Button color="red" onClick={handleAccept}>Close</Button>}
        </div>
      </div>
    </div>
  );
};

export default ToDoItems;
 