"use client";
import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";

export default function Page() {
    const printRef = useRef<HTMLDivElement>(null);

    async function onclick() {
        const input = printRef.current;
        if (!input) return;

        const canvas = await html2canvas(input, {
            scale: 2, // biar tajam
        });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("kupon.pdf");
    }

    return (
        <div>
            <button onClick={onclick}>Export PDF</button>

            <div
                ref={printRef}
                className="w-[700px] mx-auto p-4 border border-black text-[12px] font-sans bg-white text-black"
            >
                <div className="grid grid-cols-3 border-b border-black pb-2 mb-2">
                    <div>
                        <p style={{ color: "#1D4ED8", fontWeight: "600" }}>
                            SPBU.7494510
                        </p>
                        <p>Jl. Usman Binol No.1</p>
                    </div>
                    <div className="text-center">
                        <p
                            style={{
                                color: "#F59E0B",
                                fontWeight: "700",
                                fontSize: "1.75rem",
                            }}
                        >
                            KUPON
                        </p>
                        <p
                            style={{
                                color: "#B91C1C",
                                fontWeight: "700",
                                fontSize: "1.125rem",
                                marginTop: "-0.5rem",
                            }}
                        >
                            PERTAMAX
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs">PDAM No.</p>
                        <p>
                            <span
                                style={{
                                    color: "#B91C1C",
                                    fontWeight: "700",
                                    fontSize: "1.125rem",
                                }}
                            >
                                AA 00000000
                            </span>{" "}
                            <span style={{ color: "#000" }}>8372</span>
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        color: "#1D4ED8",
                        fontWeight: "700",
                        fontSize: "1.875rem",
                        textAlign: "center",
                        marginBottom: "1rem",
                    }}
                >
                    RP. 50.800
                </div>

                <ul className="list-disc pl-5 text-[11px] space-y-1">
                    <li>Kupon ini tidak dapat diuangkan</li>
                    <li>
                        Kupon ini sah bila dibubuhi tanda tangan dan stempel
                        dari pembeli dibelakang kupon ini
                    </li>
                    <li>
                        Bila ada perubahan harga BBM dari Pertamina kupon ini
                        tidak berlaku dan dapat ditukarkan pada kami,
                        disesuaikan dengan harga baru
                    </li>
                    <li>
                        Kupon ini berlaku selama 3 bulan jika lebih dari itu
                        maka dinyatakan hangus
                    </li>
                </ul>

                <div className="mt-3" style={{ color: "#DC2626" }}>
                    <span className="font-semibold">Masa berlaku:</span>
                    <div className="ml-2 inline-block">
                        <span className="text-black">15 Mei 2025</span>
                        <span className="mx-1">S/d</span>
                        <span className="text-black">15 Agustus 2025</span>
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <p>Tolitoli, 15 Mei 2025</p>
                    <p>Hormat kami</p>
                </div>
            </div>
        </div>
    );
}
