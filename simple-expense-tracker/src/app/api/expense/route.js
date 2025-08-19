"use server"

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(){
    const expense = await prisma.Expense.findMany();
    // console.log(category)
    return NextResponse.json(expense, { status: 200 });

}
