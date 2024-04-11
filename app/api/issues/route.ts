import { NextRequest, NextResponse } from "next/server";
import { title } from "process";
import z from 'zod';
import { prisma } from "@/prisma/client";
import { request } from "http";
import { Console } from "console";

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

export async function POST(request:NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.errors,{status: 400});
    const newIssue = await prisma.issue.create({
        data:{title: body.title, description: body.description}
    })
    return NextResponse.json(newIssue,{status:201});
}
export async function DELETE(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    try {
        const deletedIssue = await prisma.issue.delete({
            where: {
                id: parseInt(id, 10),
            },
        });

        return NextResponse.json(deletedIssue, { status: 200 });
    } catch (error) {
        console.error('Error deleting issue:', error);
    }
}
export async function PUT(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    try {
        // Retrieve the issue from the database
        const issueToUpdate = await prisma.issue.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        });

        // Check if the issue exists
        if (!issueToUpdate) {
            console.log("error updating issue");
        }

        // Update the status to false
        const updatedIssue = await prisma.issue.update({
            where: {
                id: parseInt(id, 10),
            },
            data: {
                status: false,
            },
        });

        return NextResponse.json(updatedIssue, { status: 200 });
    } catch (error) {
        console.error('Error updating issue status:', error);
    }
}
