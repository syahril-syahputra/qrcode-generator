"use client";
import { useReducer } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";

type TextInputProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<any>;
    name: string;
    label: string;
    placeholder: string;
};

// Rupiah formatter (no decimals)
const moneyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export default function MoneyInput(props: TextInputProps) {
    const initialRawValue = props.form.getValues()[props.name] ?? 0;

    const initialValue = moneyFormatter.format(initialRawValue);

    const [value, setValue] = useReducer((_: string, next: string) => {
        const digits = next.replace(/\D/g, ""); // only digits
        const numeric = Number(digits);
        return moneyFormatter.format(numeric);
    }, initialValue);

    // Update real value in form state
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    function handleChange(realChangeFn: Function, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, "");
        const realValue = Number(digits);
        realChangeFn(realValue);
    }

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                const _change = field.onChange;
                return (
                    <FormItem>
                        <FormLabel>{props.label}</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={props.placeholder}
                                type="text"
                                value={value}
                                onChange={(ev) => {
                                    const input = ev.target.value;
                                    setValue(input);
                                    handleChange(_change, input);
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
