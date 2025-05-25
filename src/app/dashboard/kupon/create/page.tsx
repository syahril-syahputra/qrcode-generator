"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TitleFormHeader from "@/components/Title/TitleFormHeader";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Check } from "lucide-react";
import { useCreateCoupon } from "@/fetures/useCreateCoupon";
import { errorHelper } from "@/lib/formErrorHelper";
import { ICreateCoupon } from "@/types/coupon";
import ErrorMessage from "@/components/Error/ErrorMessage";
import DatePicker from "@/components/ui/datePicker";
import MoneyInput from "@/components/ui/moneyInput";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    number: z.string().min(1, { message: "Nomor kupon tidak boleh kosong" }),
    consumer: z.string().min(1, { message: "Nama konsumen wajib diisi" }),
    startDate: z.date({
        required_error: "Masukan Tanggal Mulai.",
    }),
    expiredDate: z.date({
        required_error: "Masukan Tanggal Expired.",
    }),
    value: z
        .number({ invalid_type_error: "Nilai harus berupa angka" })
        .int("Nilai harus bilangan bulat")

        .min(1, { message: "Nilai kupon minimal 1" }),
});

export default function Page() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            consumer: "",
            number: "",
        },
        mode: "onChange",
    });
    function onSubmit(data: z.infer<typeof formSchema>) {
        const body: ICreateCoupon = {
            consumer: data.consumer,
            number: data.number,
            startDate: data.startDate,
            expiredDate: data.expiredDate,
            value: data.value,
        };

        mutate(body);
    }

    const {
        mutate,
        isPending: isLoadingCreate,
        isSuccess,
        isError,
        error,
        data: createResponse,
    } = useCreateCoupon({
        onSuccess: (data) => {
            router.push("/dashboard/kupon/" + data.data.id);
        },
        onError: (error) => errorHelper(form.setError, error),
    });
    return (
        <div className=" flex-1 space-y-4 p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <TitleFormHeader>Buat Kupon Baru</TitleFormHeader>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-8">
                            <FormField
                                control={form.control}
                                name="number"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Nomor Seri</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukan Nomor Seri"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="consumer"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Nama Pelanggan</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nama Pelanggan"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Tanggal Mulai</FormLabel>
                                        <DatePicker
                                            placeholder="Pilih Tanggal"
                                            value={field.value}
                                            block
                                            onChange={field.onChange}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="expiredDate"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Tanggal Expired</FormLabel>
                                        <DatePicker
                                            placeholder="Pilih Tanggal"
                                            value={field.value}
                                            block
                                            onChange={field.onChange}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <MoneyInput
                                form={form}
                                label="Tanggal Expired"
                                name="value"
                                placeholder="Masukan Nilai"
                            />
                        </div>
                    </div>
                    <div className="space-y-8">
                        {isError && (
                            <ErrorMessage>
                                {error.response?.data?.message ||
                                    "Something Wrong"}
                            </ErrorMessage>
                        )}
                        {isSuccess && (
                            <Alert variant={"success"}>
                                <AlertTitle className="flex items-center space-x-2">
                                    <Check />
                                    <span>{createResponse.data.message}</span>
                                </AlertTitle>
                            </Alert>
                        )}

                        <Button type="submit" loading={isLoadingCreate}>
                            SAVE
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
