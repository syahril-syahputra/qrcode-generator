"use client";
import { useQRCode } from "next-qrcode";
import React from "react";

export default function Page() {
    const { Canvas } = useQRCode();
    return (
        <div>
            {Array.from({ length: 10 }).map((_, index) => (
                <Canvas
                    key={index}
                    text={index + ""}
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
            ))}
        </div>
    );
}
