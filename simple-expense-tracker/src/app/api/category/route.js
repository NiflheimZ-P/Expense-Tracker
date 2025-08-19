"use server"

import prisma from '@/lib/prisma';

import { NextResponse } from 'next/server';

export async function GET(){
    const category = await prisma.Category.findMany();
    // console.log(category)
    return NextResponse.json(category, { status: 200 });

}

