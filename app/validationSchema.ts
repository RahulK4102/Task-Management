import { z } from 'zod';

export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255),
    description: z.string().min(1, 'Description is required.')
});
export const createUserSchema = z.object({
    name: z.string().min(1,'Name is required').max(255),
    email: z.string().min(1, 'Email is required'),
    password: z.string().min(6,'Password is required'),
    phone: z.bigint(),
    designation: z.string().min(1, 'Designation is required')
});

