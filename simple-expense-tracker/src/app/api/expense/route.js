"use server"

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(){
    const expense = await prisma.Expense.findMany({
        include:{
            category: {
                select: {
                    name: true
                }
            }
        }
    });
    // console.log(category)
    return NextResponse.json(expense, { status: 200 });

}
