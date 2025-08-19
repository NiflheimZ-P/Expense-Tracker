"use server"

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(){
    const expense = await prisma.Expense.findMany({
        include:{
            category: true,
        }
    });
    return NextResponse.json(expense, { status: 200 });
}

export async function POST(req){
    try {
        const data = await req.json();
        const expense = await prisma.Expense.create({
            data: {
                title: data.title,
                amount: data.amount,
                categoryId: Number(data.categoryId),
                date: new Date(data.date),
            },
            include: {
                category: true,
            }
        });
        return NextResponse.json({  expense, message: "Expense added successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add expense" });


    }
}