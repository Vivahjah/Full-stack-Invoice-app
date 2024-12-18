import { z } from "zod";

export const onboardingSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    address: z.string().min(2, "Address is required")
})


export const invoiceSchema = z.object({
    invoiceName: z.string().min(1, "Invoice Name is required"),
    total: z.number().min(1, "$1 is the minimum"),
    status: z.enum(["PAID", "PENDING"]).default("PENDING"),
    date: z.string().min(1, "Date is required"),
    dueDate: z.number().min(1, "Due Date is required"),
    fromName: z.string().min(1, "Your name is required"),
    fromEmail: z.string().email("Invalid Email address"),
    fromAddress: z.string().min(1, "Your Address is required"),
    clientName: z.string().min(1, "Client Name is required"),
    clientAddress: z.string().min(1, "Client Address is required"),
    clientEmail: z.string().email("Invalid email address"),
    invoiceNumber: z.number().min(1, "Minimum invoice number of 1"),
    note: z.string().optional(),
    currency: z.string().min(1, "Currency is required"),
    invoiceItemDescription: z.string().min(1, "Description is required"),
    invoiceItemQuantity: z.string().min(1, "Quantity minimum of 1"),
    invoiceItemRate: z.string().min(1, "Invoice Name is required"),
    User: z.string().min(1, "Rate min 1"),
    userId: z.string().min(1, "Invoice Name is required"),
})
