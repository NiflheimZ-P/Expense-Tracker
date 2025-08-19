"use server"

import prisma from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET(){
    const category = await prisma.Category.findMany();
    // console.log(category)
    return NextResponse.json(category, { status: 200 });

}

export async function POST(req){
    try {
        const { name } = await req.json();
        const category = await prisma.Category.create({
            data: {
                name,
            }
        });
        return NextResponse.json({  category, message: "Category added successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add Category" });

    }
}

