"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";

import { useFetchCoupon } from "@/fetures/useFetchCoupon";
import useTableConfig from "@/lib/useTableConfig";
import { ICouponFilter, IListCoupon } from "@/types/coupon";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import { InputCustom } from "@/components/ui/inputCustom";
import { ListRestart } from "lucide-react";
import { useQRCode } from "next-qrcode";

export default function Page() {
    dayjs.extend(utc);

    const { SVG } = useQRCode();
    const [titleSearch, settitleSearch] = useState("");

    const {
        filter,
        sort,
        pagination,
        setsort,
        setPagination,
        resetHandler,
        filterValue,
        setfilterValue,
        setfilter,
    } = useTableConfig<ICouponFilter>({
        defaultComlumnType: "desc",
        defaultFilter: {
            number: "",
        },
    });
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const checkTextChange = () => {
            timeoutId = setTimeout(() => {
                setfilter(filterValue);
            }, 500);
        };
        checkTextChange();
        return () => clearTimeout(timeoutId);
    }, [filterValue]);
    const { error, data, isFetching } = useFetchCoupon(
        pagination,
        filter,
        sort
    );
    const columnHelper = createColumnHelper<IListCoupon>();
    const columns = [
        columnHelper.display({
            id: "no",
            header: () => <span className="block text-center">No.</span>,
            cell: (props) => (
                <span className="block text-center">
                    {props.row.index +
                        1 +
                        (pagination.pageIndex - 1) * pagination.pageSize}
                </span>
            ),
            enableHiding: false,
        }),

        columnHelper.accessor("id", {
            id: "id",
            header: () => <span>Tanggal Input</span>,
            cell: (info) => (
                <SVG
                    text={info.getValue()}
                    options={{
                        margin: 3,

                        width: 50,
                        color: {
                            dark: "#000000",
                            light: "#FFFFFF",
                        },
                    }}
                />
            ),
            enableSorting: true,
        }),
        columnHelper.accessor("createdAt", {
            id: "createdAt",
            header: () => <span>Tanggal Input</span>,
            cell: (info) => dayjs(info.getValue()).format("DD MMM YYYY HH:mm"),
            enableSorting: true,
        }),
        columnHelper.accessor("number", {
            id: "number",
            header: () => <span>Nomor Seri</span>,
            cell: (info) => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor("consumer", {
            id: "consumer",
            header: () => <span>Nomor Pelanggan</span>,
            cell: (info) => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor("value", {
            id: "value",
            header: () => <span className="text-right">Jumlah</span>,
            cell: (info) => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor("startDate", {
            id: "startDate",
            header: () => <span>Tanggal Mulai</span>,
            cell: (info) => dayjs(info.getValue()).format("DD MMM YYYY"),
            enableSorting: true,
        }),
        columnHelper.accessor("expiredDate", {
            id: "expiredDate",
            header: () => <span>Tanggal Expired</span>,
            cell: (info) => dayjs.utc(info.getValue()).format("DD MMM YYYY"),
            enableSorting: true,
        }),
        columnHelper.accessor("useDate", {
            id: "useDate",
            header: () => <span>Tanggal Pakai</span>,
            cell: (info) => (
                <div>
                    {info.getValue() ? (
                        <a className="text-red-500">
                            {dayjs.utc(info.getValue()).format("DD MMM YYYY")}
                        </a>
                    ) : (
                        <a className="text-green-600">Belum Di Gunakan</a>
                    )}
                </div>
            ),
            enableSorting: true,
        }),

        columnHelper.display({
            id: "actions",
            cell: (props) => (
                <div className="text-right">
                    <Link href={"/dashboard/kupon/" + props.row.original.id}>
                        <Button variant={"secondary"}>View</Button>
                    </Link>
                </div>
            ),
            enableHiding: false,
        }),
    ];
    return (
        <div>
            <div className="flex flex-1 items-center bg-secondary mt-8 p-4 rounded-lg">
                <div className="grid flex-1 grid-cols-4 gap-4">
                    <InputCustom
                        className="w-full"
                        placeholder="Masukan Nomor Seri"
                        value={titleSearch}
                        onChange={(e) => {
                            const val: string = e.target.value;
                            settitleSearch(val);
                            if (e.target.value.length >= 1) {
                                setfilterValue({
                                    ...filterValue,
                                    number: e.target.value,
                                });
                            }
                        }}
                    />
                    <div className="w-auto pr-4">
                        <Button
                            variant={"ghost"}
                            onClick={() => resetHandler()}
                        >
                            <ListRestart className="mr-2" />
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
            <div className="my-5 space-y-4">
                <DataTable
                    columns={columns}
                    data={data?.data}
                    meta={data?.meta}
                    sort={sort}
                    loading={isFetching}
                    error={error}
                    setSort={setsort}
                    setPagination={setPagination}
                    className="min-h-60"
                />
            </div>
        </div>
    );
}
