"use client";
import TitleFormHeader from "@/components/Title/TitleFormHeader";
import { Separator } from "@/components/ui/separator";
import { useDetailCoupon } from "@/fetures/useDetailCoupon";
import { formatRupiah } from "@/lib/formatRp";
import dayjs from "dayjs";
import DeleteCoupon from "./DeleteListing";
import { CouponPreview } from "./CuponPreview";
interface Props {
    id: string;
}
export default function DetailKuponClient({ id }: Props) {
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
                    <CouponPreview
                        id={data.id}
                        number={data.number}
                        consumer={data.consumer}
                        value={data.value}
                        startDate={data.startDate}
                        expiredDate={data.expiredDate}
                        createdAt={data.createdAt}
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
            </div>
        );
    }
}
