import { NextRequest, NextResponse } from "next/server";
import { title } from "process";
import z from 'zod';
import { prisma } from "@/prisma/client";
import { request } from "http";
import { Console } from "console";

const createUserSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email(),
    password: z.string().min(6) 
});

export async function POST(request:NextRequest){
    const body = await request.json();
    const validation = createUserSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.errors,{status: 400});
    const newUser = await prisma.user.create({
        data:{name: body.name, email: body.email, password: body.password}
    })
    return NextResponse.json(newUser,{status:201});
}
// export async function DELETE(request: NextRequest) {
//     const searchParams = request.nextUrl.searchParams;
//     const id = searchParams.get('id');
//     try {
//         const deletedIssue = await prisma.issue.delete({
//             where: {
//                 id: parseInt(id, 10),
//             },
//         });

//         return NextResponse.json(deletedIssue, { status: 200 });
//     } catch (error) {
//         console.error('Error deleting issue:', error);
//     }
// }
// export async function PUT(request: NextRequest) {
//     const searchParams = request.nextUrl.searchParams;
//     const id = searchParams.get('id');

//     try {
//         // Retrieve the issue from the database
//         const issueToUpdate = await prisma.issue.findUnique({
//             where: {
//                 id: parseInt(id, 10),
//             },
//         });

//         // Check if the issue exists
//         if (!issueToUpdate) {
//             console.log("error updating issue");
//         }

//         // Update the status based on current status
//         let updatedStatus;
//         if (issueToUpdate.status === 'Open') {
//             updatedStatus = 'In_Progress';
//         } else if (issueToUpdate.status === 'In_Progress') {
//             updatedStatus = 'Closed';
//             const updatedIssue = await prisma.issue.update({
//                 where: {
//                     id: parseInt(id, 10),
//                 },
//                 data: {
//                     updated: new Date(), 
//                 },
//             });
    
//         }

//         // Update the issue status
//         const updatedIssue = await prisma.issue.update({
//             where: {
//                 id: parseInt(id, 10),
//             },
//             data: {
//                 status: updatedStatus,
//             },
//         });

//         return NextResponse.json(updatedIssue, { status: 200 });
//     } catch (error) {
//         console.error('Error updating issue status:', error);
//         // return NextResponse.error('Failed to update issue status', { status: 500 });
//     }
// }
export async function PUT(request: NextRequest) {
    try {
        // Extract email from the query parameters
        const searchParams = request.nextUrl.searchParams;
        const email = searchParams.get('email') as string;
        console.log(email)
        // Check if email is provided
        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        // Find the user in the database based on the provided email
        const user = await prisma.user.findUnique({
            where: { email:email }
        });

        // If user doesn't exist, return error message
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // If the user exists, return the user id
        return NextResponse.json({ userId: user.id });
    } catch (error) {
        console.error('Error retrieving user:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
