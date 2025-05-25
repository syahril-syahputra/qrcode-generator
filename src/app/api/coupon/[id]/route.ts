import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/coupon/:id
export async function GET(req: NextRequest) {
    const id = req.nextUrl.pathname.split("/").pop(); // atau gunakan regex untuk lebih aman

    if (!id) {
        return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    try {
        const coupon = await prisma.coupon.findUnique({
            where: { id },
        });

        if (!coupon) {
            return NextResponse.json(
                { error: "Kupon tidak ditemukan" },
                { status: 404 }
            );
        }

        return NextResponse.json(coupon);
    } catch (error) {
        return NextResponse.json(
            { error: "Terjadi kesalahan: " + error },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
        return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    try {
        const deletedCoupon = await prisma.coupon.delete({
            where: { id },
        });

        return NextResponse.json(deletedCoupon, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json(
            { error: "Terjadi kesalahan: " + error },
            { status: 400 }
        );
    }
}
