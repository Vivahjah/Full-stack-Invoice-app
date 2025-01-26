
import { redirect } from "next/navigation";
import { auth } from "../utils/auth";
import { DashboardBlocks } from "../components/DashboardBlocks";
import InvoiceGraph from "../components/InvoiceGraph";
import { RecentInvoices } from "../components/RecentInvoices";
import prisma from "../utils/db";
import EmptyState from "../components/EmptyState";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";


export async function getData(userId: string) {
    const data = prisma.invoice.findMany({
        where: {
            userId: userId,
        }
        ,
        select: {
            id: true
        }
    })

    return data;
}


export default async function Dashboard() {
    const session = await auth();
    if (!session?.user) {
        redirect("/login")
    }

    const data = await getData(session.user?.id as string)


    return (
        <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it right here"
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
          <DashboardBlocks />
          <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
            <InvoiceGraph />
            <RecentInvoices />
          </div>
        </Suspense>
      )}
    </>
    );
}
