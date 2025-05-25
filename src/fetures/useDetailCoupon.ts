import fetchClient from "@/lib/FetchClient";
import { ICoupon } from "@/types/coupon";
import { useQuery } from "@tanstack/react-query";

export const useDetailCoupon = (id?: string) => {
    return useQuery({
        queryFn: async () => {
            const response = await fetchClient({
                url: `/coupon/${id || ""}`,
            });
            return response.data as ICoupon;
        },
        refetchOnWindowFocus: false,
        queryKey: ["detail.kupon", id],
    });
};
