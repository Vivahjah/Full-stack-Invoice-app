"use server";

import { requiredUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod"
import { invoiceSchema, onboardingSchema } from "./utils/zodSchema";
import prisma from "./utils/db";
import { redirect } from "next/navigation";

export async function onboardUser(prevState: unknown, formData: FormData) {
    const session = await requiredUser();

    const submission = parseWithZod(formData, { //comparing the form with the schema
        schema: onboardingSchema,
    })

    if (submission.status !== "success") return submission.reply();

     await prisma.user.update({
        where: {
            id: session.user?.id
        },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,

        }

        
    })

return redirect("/dashboard")

}


export async function createInvoice(prevState : unknown, formData : FormData) {
     await requiredUser();
    const submission = parseWithZod(formData, {
        schema : invoiceSchema,
    });

    if(submission.status !== "success"){
        return submission.reply()
    }

    await prisma.invoice.create({
        data : {
            clientAddress : submission.value.clientAddress,
            clientEmail : submission.value.clientEmail,
            clientName : submission.value.clientName,
            currency : submission.value.currency,
            date : submission.value.date,
            dueDate : submission.value.dueDate,
            invoiceItemDescription : submission.value.invoiceItemDescription,
            invoiceItemRate : submission.value.invoiceItemRate,
            fromEmail : submission.value.fromEmail,
            fromAddress : submission.value.fromAddress,
            fromName : submission.value.fromName,
            status: submission.value.status,
            invoiceName : submission.value.invoiceName,
            invoiceNumber : submission.value.invoiceNumber,
            note : submission.value.note,
            invoiceItemQuantity : submission.value.invoiceItemQuantity,
            total : submission.value.total,
           },

    })

    
}

