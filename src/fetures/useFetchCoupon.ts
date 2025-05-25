import fetchClient from "@/lib/FetchClient";
import { ICouponFilter, IListCoupon } from "@/types/coupon";
import { ITableMeta, ITableSort } from "@/types/table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";

export const useFetchCoupon = (
    page: PaginationState,
    filter: ICouponFilter,
    sort: ITableSort
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/coupon`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...filter,
                ...sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data as {
                data: IListCoupon[];
                meta: ITableMeta;
            };
        },
        queryKey: ["fetch.listing", page, filter, sort],
        placeholderData: keepPreviousData,
    });
};
