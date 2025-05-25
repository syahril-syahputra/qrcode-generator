import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // pastikan path sesuai∂

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const newUser = await prisma.coupon.create({
            data: {
                consumer: body.consumer,
                number: body.number,
                value: body.value,
                startDate: body.startDate,
                expiredDate: body.expiredDate,
            },
        });
        return NextResponse.json(newUser, { status: 201 });
    } catch (error: unknown) {
        return NextResponse.json(
            { error: "Invalid data" + error },
            { status: 400 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const page = searchParams.get("page")
            ? parseInt(searchParams.get("page")!)
            : 1;
        const limit = searchParams.get("paginate")
            ? parseInt(searchParams.get("paginate")!)
            : 10;
        const offset = (page - 1) * limit;

        const sortBy = searchParams.get("sort_by") || "createdAt";
        const sortType =
            searchParams.get("sort_type") === "asc" ? "asc" : "desc"; // default to desc

        const number = searchParams.get("number"); // ambil parameter number

        const whereClause = number
            ? {
                  number: {
                      contains: number,
                  },
              }
            : undefined;

        const data = await prisma.coupon.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                [sortBy]: sortType,
            },
            where: whereClause,
        });

        const totalData = await prisma.coupon.count();

        const meta = {
            page,
            paginate: limit,
            total_data: totalData,
            total_page: Math.ceil(totalData / limit),
        };

        return NextResponse.json(
            {
                meta,
                data,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { msg: JSON.stringify(error) },
            { status: 500 }
        );
    }
}
