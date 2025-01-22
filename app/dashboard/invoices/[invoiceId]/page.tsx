
import { EditInvoice } from "@/app/components/EditInvoices";
import prisma from "@/app/utils/db";
import { requiredUser } from "@/app/utils/hooks";
import { notFound } from "next/navigation";

async function getData(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId,
        },
    });

    if (!data) {
        notFound(); // Invoke `notFound` function directly
    }

    return data;
}

type Params = { invoiceId: string };

export default async function EditInvoicePage({ params }: { params: Params }) {
    const { invoiceId } = params; // Correctly destructure params
    const session = await requiredUser(); // Ensure this resolves before accessing session.user
    const data = await getData(invoiceId, session.user?.id as string);

    return (
      
        <EditInvoice data={data} />
    );
}
