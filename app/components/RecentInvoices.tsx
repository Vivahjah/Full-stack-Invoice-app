import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "../utils/db";
import { requiredUser } from "../utils/hooks";


async function fetchRecentInvoices(userId : string) {
   const data = await prisma.invoice.findMany({
       where: { 
              userId: userId
        },
        select: {
            id: true,
            clientName : true,
            clientEmail : true,
            total : true,
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 7,
     });
     return data;
}
export async function RecentInvoices() {
    const session = await requiredUser();
    const data = await fetchRecentInvoices(session.user?.id as string)
    return (
        <Card>
            <CardHeader className="font-medium">
                <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
               {data.map((invoice) => (
                     <div key={invoice.id} className="flex items-center gap-4">
                     <Avatar className="hidden sm:flex size-9">
                         <AvatarFallback>MU</AvatarFallback>
                     </Avatar>
                     <div className="flex flex-col">
                         <p className="text-sm font-medium leading-none">{invoice.clientName}</p>
                         <p className="text-sm text-muted-foreground">{invoice.clientEmail  }</p>
                     </div>
                     <div className="ml-auto font-medium">+{invoice.total}</div>
                 </div>
                )
               )}
            </CardContent>
        </Card>
    )
}