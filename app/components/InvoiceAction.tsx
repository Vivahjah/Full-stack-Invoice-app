"use client"


import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Check, DownloadCloudIcon, Mail, MoreHorizontal, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

type InvoiceActionProps = {
    id: string,
    status: string
}



export function InvoiceAction({ id, status }: InvoiceActionProps) {

    const handleSendReminder = () => {
        toast.promise(
            fetch(`/api/email/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            {
                loading: "Sending reminder email...",
                success: "Reminder email sent successfully",
                error: "Failed to send reminder email",
            }
        );
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant={"secondary"}>
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}`} ><PencilIcon className="size-4 mr-2" />  Edit Invoice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/api/invoice/${id}`} target="_blank"><DownloadCloudIcon className="size-4 mr-2" />Download Invoice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSendReminder}>
                    <Mail className="size-4 mr-2" />  Send Reminders
                </DropdownMenuItem>
                {status !== "PAID" && <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}/paid`}><Check className="size-4 mr-2" />  Mark as Paid</Link>
                </DropdownMenuItem>}
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}/delete`} ><Trash className="size-4 mr-2" />  Delete Invoice</Link>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}