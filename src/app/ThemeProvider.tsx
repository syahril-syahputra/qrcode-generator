"use client";
import * as React from "react";
import {
    ThemeProvider as NextThemesProvider,
    ThemeProviderProps,
} from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const queryClient = new QueryClient();
    return (
        <NextThemesProvider defaultTheme="dark" {...props}>
            <QueryClientProvider client={queryClient}>
                <div>{children}</div>
            </QueryClientProvider>
        </NextThemesProvider>
    );
}
