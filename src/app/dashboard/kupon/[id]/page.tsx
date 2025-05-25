import DetailKuponClient from "./DetailKupon";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    return <DetailKuponClient id={id} />;
}
