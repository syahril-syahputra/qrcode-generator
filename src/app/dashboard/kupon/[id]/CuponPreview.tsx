import React, { useRef } from "react";
import dayjs from "dayjs";
import { useQRCode } from "next-qrcode";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import Image from "next/image";

type CouponPreviewProps = {
    id: string;
    number: string;
    consumer: string;
    value: number;
    startDate: string;
    expiredDate: string;
    createdAt: string;
};

export const CouponPreview: React.FC<CouponPreviewProps> = ({
    id,
    number,
    consumer,
    value,
    startDate,
    expiredDate,
}) => {
    const { Image: ImageQR } = useQRCode();
    const printRef = useRef<HTMLDivElement>(null);

    async function onclick() {
        const input = printRef.current;
        if (!input) return;

        const canvas = await html2canvas(input, {
            scale: 2,
        });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);

        const margin = 12;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const maxWidth = pageWidth - margin * 2;
        const maxHeight = pageHeight - margin * 2;

        let imgWidth = maxWidth;
        let imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        if (imgHeight > maxHeight) {
            imgHeight = maxHeight;
            imgWidth = (imgProps.width * imgHeight) / imgProps.height;
        }

        const x = (pageWidth - imgWidth) / 2;
        const y = margin; // pastikan menempel ke atas dengan jarak margin

        pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        pdf.save("kupon.pdf");
    }

    return (
        <div className="flex flex-col space-y-4">
            <div
                ref={printRef}
                className="w-[900px] p-6 text-black bg-white border border-black font-mono text-[14px] relative overflow-hidden shadow-md"
            >
                {/* Header */}

                <div className="flex justify-between">
                    <div className="font-bold text-blue-800 ">
                        <div>SPBU.7494510</div>
                        <div>Jl. Usman Binol No.1</div>
                    </div>
                    <div className="text-right">
                        <p className="text-red-700 font-bold">
                            {consumer} No. <span>{number}</span>
                        </p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center  space-x-4">
                        <div>
                            <h1 className=" font-bold text-yellow-400 text-6xl  drop-shadow-md">
                                KUPON
                            </h1>
                        </div>
                        <Image
                            src="/pertamax.png"
                            width={200}
                            height={100}
                            alt="logo"
                            className="h-14"
                        />
                    </div>
                    <div className="font-bold text-blue-800 text-2xl flex flex-col space-y-1 ">
                        <div>Konsumen</div>
                        <div className="font-bold">{consumer}</div>
                    </div>
                </div>

                <div className="flex justify-between items-center space-x-4">
                    <ul className="text-[12px] flex-1 mt-2 list-disc ">
                        <h2 className=" text-4xl  font-bold text-blue-800 mt-2">
                            RP. {value.toLocaleString()}
                        </h2>
                        <li>Kupon ini tidak dapat diuangkan</li>
                        <li>
                            Kupon ini sah bila dibubuhi tanda tangan dan stempel
                            dari pembeli di belakang kupon ini
                        </li>
                        <li>
                            Bila ada perubahan harga BBM dari Pertamina kupon
                            ini tidak berlaku dan dapat ditukarkan pada kami,
                            disesuaikan dengan harga baru
                        </li>
                        <li>
                            Kupon ini berlaku selama 3 bulan jika lebih dari itu
                            maka dinyatakan hangus
                        </li>
                        <li className="font-bold text-red-700 text-lg ">
                            <span>Masa berlaku:</span>
                            <div className="flex gap-2">
                                <span>
                                    {dayjs(startDate).format("DD MMMM YYYY")}
                                </span>
                                <span>S/d</span>
                                <span>
                                    {dayjs(expiredDate).format("DD MMMM YYYY")}
                                </span>
                            </div>
                        </li>
                    </ul>
                    <div className="flex flex-col space-x-y mt-4 ">
                        <div className="text-center text-sm">
                            <p>
                                Tolitoli,{" "}
                                <span>
                                    {dayjs(startDate).format("DD MMM YYYY")}
                                </span>
                            </p>
                            <p>Hormat kami</p>
                        </div>
                        <div className="h-16"></div>
                        <div className="mt-6 border-t w-full border-black mx-auto" />
                    </div>
                    <ImageQR
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
            </div>
            <Button
                variant={"secondary"}
                className="bg-green-700"
                onClick={onclick}
            >
                Download Kupon
            </Button>
        </div>
    );
};
