"use client";
import { Button, TextField,Callout,Text } from "@radix-ui/themes";
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import {z} from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;


const NewIssue = () => {
  const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
  const router = useRouter();
  const { register, control, handleSubmit, formState:{errors} } = useForm<IssueForm>({resolver: zodResolver(createIssueSchema)});
  const [error,setError] = useState('');
  const [isSubmitting,setSubmitting] = useState(false);
  return (
  <div className="max-w-xl mt-32 ml-12" >
    {error && <Callout.Root color="red" className="mb-5" >
      <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
    <form
      className="  space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data);
          router.push("/Issues");
          setSubmitting(true);
        } catch (error) {
          setError('An unexpected error occurred');
          setSubmitting(false);
        }
      })}
      >
      <TextField.Root placeholder="Title" {...register("title")}>
        
      </TextField.Root>
      {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
      <Button disabled={isSubmitting}>Create Issue {isSubmitting && <Spinner/>} </Button>
    </form>
  </div>
  );
};

export default NewIssue;