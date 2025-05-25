"use client";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="px-4 w-full">
                <SidebarTrigger />
                <div className=" flex-1 w-full px-4">{children}</div>
            </main>
        </SidebarProvider>
    );
}
