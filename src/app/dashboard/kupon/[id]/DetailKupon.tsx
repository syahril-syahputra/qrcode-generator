/* eslint-disable jsx-a11y/alt-text */
"use client";
import TitleFormHeader from "@/components/Title/TitleFormHeader";
import { Separator } from "@/components/ui/separator";
import { useDetailCoupon } from "@/fetures/useDetailCoupon";
import { formatRupiah } from "@/lib/formatRp";
import dayjs from "dayjs";
import { useQRCode } from "next-qrcode";
import DeleteCoupon from "./DeleteListing";
interface Props {
    id: string;
}
export default function DetailKuponClient({ id }: Props) {
    const { Image } = useQRCode();

    const { data, isError, isLoading, isSuccess } = useDetailCoupon(id);
    if (isLoading) {
        return <div className="text-2xl text-center">Please Wait...</div>;
    }
    if (isError) {
        return <div className="text-2xl text-center">Data Tidak Ditemukan</div>;
    }
    if (isSuccess) {
        return (
            <div>
                <div>
                    <TitleFormHeader>Detail Kupon</TitleFormHeader>
                </div>
                <div className="flex items-center justify-center">
                    <Image
                        text={id}
                        options={{
                            errorCorrectionLevel: "M",
                            margin: 3,
                            scale: 4,
                            width: 200,
                            color: {
                                dark: "#000000",
                                light: "#FFFFFF",
                            },
                        }}
                    />
                </div>
                <div className="space-y-4 py-8">
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">
                            Nomor Seri
                        </label>
                        <span>{data?.number}</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">
                            Nama Pelanggan
                        </label>
                        <span>{data?.consumer}</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">
                            Berlaku Sejak
                        </label>
                        <span>
                            {dayjs(data?.startDate).format("DD MMM YYYY")}
                        </span>
                    </div>

                    <Separator />
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">
                            Berlaku Hingga
                        </label>
                        <span>
                            {dayjs(data?.expiredDate).format("DD MMM YYYY")}
                        </span>
                    </div>
                    <Separator />
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">
                            Nilai Kupon
                        </label>
                        <span>{formatRupiah(data?.value)}</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col space-y-2">
                        <label className="text-xl font-semibold">
                            Status Pakai
                        </label>
                        <div>
                            {data?.useDate ? (
                                <a className="text-red-500">
                                    {dayjs
                                        .utc(data?.useDate)
                                        .format("DD MMM YYYY")}
                                </a>
                            ) : (
                                <a className="text-green-600">
                                    Belum Di Gunakan
                                </a>
                            )}
                        </div>
                    </div>

                    <Separator />
                    <DeleteCoupon id={id} />
                </div>
                <div
                    id="coupon-pdf"
                    className="bg-white p-6 border w-[700px] mx-auto shadow-md text-sm"
                >
                    <div className="text-center font-bold text-lg mb-2">
                        SPBU.7494510
                    </div>
                    <div className="text-center mb-1">Jl. Usman Binol No.1</div>
                    <div className="text-2xl font-bold text-yellow-500">
                        KUPON Pertamax
                    </div>
                    <div className="text-blue-600 text-xl font-bold mb-2">
                        RP. {formatRupiah(data?.value).replace("Rp", "").trim()}
                    </div>
                    <ul className="text-xs list-disc pl-4 space-y-1 mb-2">
                        <li>Kupon ini tidak dapat diuangkan</li>
                        <li>
                            Kupon ini sah bila dibubuhi tanda tangan dan stempel
                        </li>
                        <li>
                            Bila ada perubahan harga BBM dari Pertamina kupon
                            ini tidak berlaku
                        </li>
                        <li>Kupon ini berlaku selama 3 bulan</li>
                    </ul>
                    <div className="text-red-600 text-xs font-bold">
                        Masa berlaku:{" "}
                        {dayjs(data?.startDate).format("DD MMM YYYY")} s/d{" "}
                        {dayjs(data?.expiredDate).format("DD MMM YYYY")}
                    </div>
                    <div className="flex justify-between text-xs mt-4">
                        <div>
                            Konsumen:{" "}
                            <span className="font-bold">{data?.consumer}</span>
                        </div>
                        <div>
                            Tolitoli,{" "}
                            {dayjs(data?.createdAt).format("DD MMM YYYY")}
                            <br />
                            <span className="italic">Hormat kami</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
