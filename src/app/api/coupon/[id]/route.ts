import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // atau ganti dengan domain spesifik
    "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    // Ini wajib untuk menangani preflight request dari browser
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
        return NextResponse.json(
            { error: "ID tidak valid" },
            { status: 400, headers: corsHeaders }
        );
    }

    try {
        const coupon = await prisma.coupon.findUnique({
            where: { id },
        });

        if (!coupon) {
            return NextResponse.json(
                { error: "Kupon tidak ditemukan" },
                { status: 404, headers: corsHeaders }
            );
        }

        return NextResponse.json(coupon, { headers: corsHeaders });
    } catch (error) {
        return NextResponse.json(
            { error: "Terjadi kesalahan: " + error },
            { status: 500, headers: corsHeaders }
        );
    }
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
        return NextResponse.json(
            { error: "ID tidak valid" },
            { status: 400, headers: corsHeaders }
        );
    }

    try {
        const deletedCoupon = await prisma.coupon.delete({
            where: { id },
        });

        return NextResponse.json(deletedCoupon, {
            status: 200,
            headers: corsHeaders,
        });
    } catch (error: unknown) {
        return NextResponse.json(
            { error: "Terjadi kesalahan: " + error },
            { status: 400, headers: corsHeaders }
        );
    }
}

export async function PATCH(req: NextRequest) {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
        return NextResponse.json(
            { error: "ID tidak valid" },
            { status: 400, headers: corsHeaders }
        );
    }

    try {
        const updatedCoupon = await prisma.coupon.update({
            where: { id },
            data: {
                useDate: new Date(), // set waktu saat ini
            },
        });

        return NextResponse.json(updatedCoupon, {
            status: 200,
            headers: corsHeaders,
        });
    } catch (error: unknown) {
        return NextResponse.json(
            { error: "Terjadi kesalahan: " + error },
            { status: 400, headers: corsHeaders }
        );
    }
}
