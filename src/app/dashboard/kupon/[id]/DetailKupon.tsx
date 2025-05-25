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
    const { Canvas } = useQRCode();

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
                    <Canvas
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
                    <DeleteCoupon id={id} />
                </div>
            </div>
        );
    }
}
