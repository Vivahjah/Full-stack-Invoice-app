"use server";

import { requiredUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod"
import { invoiceSchema, onboardingSchema } from "./utils/zodSchema";
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";


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


export async function createInvoice(prevState: unknown, formData: FormData) {
    const session = await requiredUser();
    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });


    if (submission.status !== "success") {
        return submission.reply()
    }
   const data =  await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
            userId: session.user?.id,
        },
    });

    const sender = {
        email: "hello@demomailtrap.com",
        name: "Mailtrap Test",
      };
 
      
     await emailClient
        .send({
          from: sender,
          to: [{email: "vivahjah@gmail.com"}],
          template_uuid: "418c41a5-ec8f-4c14-81c1-2a16e46f569e",
          template_variables: {
            "clientName": submission.value.clientName,
            "clientNumber": submission.value.invoiceNumber,
            "dueDate": submission.value.dueDate,
            "total": formatCurrency({
                amount : submission.value.total,
                currency : submission.value.currency as  "USD" | "EUR"
            }),
            "invoiceLink": `http://localhost:3000/api/invoice/${data.id}`
          }
        })
        .then(console.log, console.error);


    return redirect("/dashboard/invoices");

}

export async function editInvoice(prevState: unknown, formData: FormData) {
    const session = await requiredUser();
  
    const submission = parseWithZod(formData, {
      schema: invoiceSchema,
    });
  
    if (submission.status !== "success") {
      return submission.reply();
    }
  
    const data = await prisma.invoice.update({
      where: {
        id: formData.get("id") as string,
        userId: session.user?.id,
      },
      data: {
        clientAddress: submission.value.clientAddress,
        clientEmail: submission.value.clientEmail,
        clientName: submission.value.clientName,
        currency: submission.value.currency,
        date: submission.value.date,
        dueDate: submission.value.dueDate,
        fromAddress: submission.value.fromAddress,
        fromEmail: submission.value.fromEmail,
        fromName: submission.value.fromName,
        invoiceItemDescription: submission.value.invoiceItemDescription,
        invoiceItemQuantity: submission.value.invoiceItemQuantity,
        invoiceItemRate: submission.value.invoiceItemRate,
        invoiceName: submission.value.invoiceName,
        invoiceNumber: submission.value.invoiceNumber,
        status: submission.value.status,
        total: submission.value.total,
        note: submission.value.note,
      },
    });
  
    const sender = {
        email: "hello@demomailtrap.com",
        name: "Mailtrap Test",
      };

    await emailClient.send({
      from: sender,
      to: [{email: "vivahjah@gmail.com"}],
      template_uuid: "9e9887c3-a1e3-4c78-bdde-05487a7587d0",
      template_variables: {
        clientName: submission.value.clientName,
        invoiceNumber: submission.value.invoiceNumber,
        invoiceDueDate: new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(new Date(submission.value.date)),
        invoiceAmount: formatCurrency({
          amount: submission.value.total,
          currency: submission.value.currency as "USD" | "EUR"
        }),
        invoiceLink:
          process.env.NODE_ENV !== "production"
            ? `http://localhost:3000/api/invoice/${data.id}`
            : `https://invoice-marshal.vercel.app/api/invoice/${data.id}`,
      },
    });
  
    return redirect("/dashboard/invoices");
  }
  
  export async function DeleteInvoice(invoiceId: string) {
    const session = await requiredUser();
  
     await prisma.invoice.delete({
      where: {
        userId: session.user?.id,
        id: invoiceId,
      },
    });
  
    return redirect("/dashboard/invoices");
  }
  
  export async function MarkAsPaidAction(invoiceId: string) {
    const session = await requiredUser();
  
     await prisma.invoice.update({
      where: {
        userId: session.user?.id,
        id: invoiceId,
      },
      data: {
        status: "PAID",
      },
    });
  
    return redirect("/dashboard/invoices");
  }