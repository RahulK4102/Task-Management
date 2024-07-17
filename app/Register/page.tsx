"use client";
import { Button, TextField, Callout, Text } from "@radix-ui/themes";
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../validationSchema";
import { z } from 'zod';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type UserForm = z.infer<typeof createUserSchema>
const Page = () => {
  const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<UserForm>({ resolver: zodResolver(createUserSchema) });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <section className="max-w-md w-full">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit(async (data) => {
            try {
              await axios.post("/api/user", data);
              router.push("/");
              setSubmitting(true);
            } catch (error) {
              setError('An unexpected error occurred');
              setSubmitting(false);
            }
          })} >
            <h2 className="text-2xl mb-6 font-bold">Register</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                {...register("name")}
                onChange={(e)=>{
                  const nameRegex = /^[A-Za-z\s]+$/;
                  if (!nameRegex.test(e.target.value)) {
                    setError('Invalid name. Please enter only alphabets and spaces.');
                  }else{
                    setError('')
                  }
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                {...register("email")}
                onChange={(e)=>{
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(e.target.value)) {
                    setError('Invalid email address.');
                  }else{
                    setError('');
                  }
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="designation">
                Designation
              </label>
              <select
                {...register("designation")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="designation"
                required
              >
                <option value="">Select Designation</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="PhoneNumber">
                PhoneNumber
              </label>
              <input
                {...register("phone")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="number"
                type="PhNumber"
                placeholder="Phone Number"
                required
                onChange={(e)=>{
                  const phoneRegex = /^\d{10}$/;
                  if (!phoneRegex.test(e.target.value)) {
                    setError('Invalid phone number. Please enter a 10-digit number.');
                  }else{
                    setError('')
                  }
                  
                }}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                {...register("password")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="number"
                type="Password"
                placeholder="Password"
                required
              />
            </div>
            <p className=" text-red-700 text-sm">{error}</p>
            <div className="flex items-center justify-between">
              <a className="text-blue-500 text-sm" href="#">
                Forgot password?
              </a>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              type="submit"
            >
              {isSubmitting ? <Spinner /> : "Register"}
            </button>
            <div className="text-center mt-4">
              <p className="text-sm">
                Already have an account?{" "}
                <a className="text-blue-500" href="/">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Page;
