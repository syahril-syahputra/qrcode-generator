import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/coupon/:id
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    try {
        const coupon = await prisma.coupon.findUnique({
            where: {
                id: id,
            },
        });

        if (!coupon) {
            return NextResponse.json(
                { error: "Kupon tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json(coupon, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Terjadi kesalahan saat mengambil data" + error },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const newUser = await prisma.coupon.delete({
            where: {
                id: id,
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
