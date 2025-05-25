import fetchClient from "@/lib/FetchClient";
import { ICreateCoupon } from "@/types/coupon";
import { IError } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<IError>) => void;
}

export const useCreateCoupon = ({ onSuccess, onError }: IProps) => {
    return useMutation({
        mutationFn: async (body: ICreateCoupon) => {
            const response = await fetchClient({
                method: "POST",
                url: "/coupon",
                body: body,
            });

            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};
