"use client";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteCoupon } from "@/fetures/useDeleteCoupon";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

export default function DeleteCoupon(props: { id?: string | undefined }) {
    const router = useRouter();
    const [dialog, setDialog] = useState(false);

    const { mutate, isPending } = useDeleteCoupon({
        onSuccess: (success) => {
            setDialog(false);
            console.log(success);
            router.push("/dashboard/kupon");
        },
        onError: (error) => {
            console.log(error);
        },
        id: props.id,
    });

    return (
        <Fragment>
            <Button
                variant={"destructive"}
                loading={isPending}
                onClick={() => setDialog(true)}
            >
                {/* <Trash className="mr-2" /> */}
                Delete
            </Button>
            <AlertDialog open={dialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                            <span className="italic">
                                Delete listing, this action cannot be undone
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDialog(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isPending}
                            className="bg-destructive"
                            onClick={() => mutate(props.id!)}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Fragment>
    );
}
