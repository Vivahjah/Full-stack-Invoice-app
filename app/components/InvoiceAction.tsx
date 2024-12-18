import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Check, DownloadCloudIcon, Mail, MoreHorizontal, PencilIcon, Trash } from "lucide-react";
import Link from "next/link";


export function InvoiceAction(){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant={"secondary"}>
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={""} ><PencilIcon className="size-4 mr-2"/>  Edit Invoice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={""} ><DownloadCloudIcon className="size-4 mr-2"/>  Download Invoice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={""} ><Mail className="size-4 mr-2"/>  Send Reminders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={""} ><Check className="size-4 mr-2"/>  Mark as Paid</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={""} ><Trash className="size-4 mr-2"/>  Trash</Link>
                </DropdownMenuItem>
              
            </DropdownMenuContent>
        </DropdownMenu>
    )
}