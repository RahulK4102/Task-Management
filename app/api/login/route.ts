// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { compare } from 'bcryptjs';
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
    try {
      try {
        const { email, password } = await request.json();

        const user = await prisma.user.findUnique({
            where: { email }
        });

      } catch (error) {
        
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    
      }
        

        return NextResponse.json({ userId: user.id });
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
