export function formatRupiah(
    value: number | string | undefined | null
): string {
    if (!value) return "Rp 0";

    const number = typeof value === "string" ? parseInt(value) : value;

    return `Rp ${number.toLocaleString("id-ID")}`;
}
