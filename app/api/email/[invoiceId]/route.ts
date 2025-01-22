import prisma from "@/app/utils/db";
import { requiredUser } from "@/app/utils/hooks";

import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ invoiceId: string }>;
    }
) {
    try {
        const session = await requiredUser();

        const { invoiceId } = await params;

        const invoiceData = await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
                userId: session.user?.id,
            },
        });

        if (!invoiceData) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        const sender = {
            email: "hello@demomailtrap.com",
            
        };

        emailClient.send({
            from: sender,
            to: [{ email: "vivahjah@gmail.com" }],
            template_uuid: "03c0c5ec-3f09-42ab-92c3-9f338f31fe2c",
            template_variables: {
                first_name: invoiceData.clientName,
                company_info_name: "InvoiceMarshal",
                company_info_address: "Chad street 124",
                company_info_city: "Lagos",
                company_info_zip_code: "100001",
                company_info_country: "Nigeria",
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to send Email reminder" },
            { status: 500 }
        );
    }
}