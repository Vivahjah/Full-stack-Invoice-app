"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar1Icon } from "lucide-react";
import { useActionState, useState } from "react";
import { createInvoice } from "../actions";
import SubmitButton from "./SubmitButton";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchema";
import { formatCurrency } from "../utils/formatCurrency";

type InvoiceProps = {
    firstName : string;
    lastName : string;
    address : string;
    email : string;

}


export default function CreateInvoice({firstName, lastName, address, email} : InvoiceProps) {

    const [lastResult, action] = useActionState(createInvoice, undefined)
    const [form, fields] = useForm({
        lastResult,


        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: invoiceSchema,
            })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"

    })
   


    const [selectedDate, setSelectedDate] = useState(new Date());
    const [quantity, setQuantity] = useState("")
    const [rate, setRate] = useState("")
    const [currency, setCurrency] = useState("USD")

    const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0);




    return (
        <Card className="w-full max-w-5xl mx-auto">
            <CardContent className="p-6">
                <form id={form.id} action={action} onSubmit={form.onSubmit}>
                    <Input type={"hidden"} name={fields.date.name} value={selectedDate.toISOString()} />
                    <Input type={"hidden"} name={fields.total.name} value={calculateTotal}  />
                    <div className="flex flex-col gap-1 mb-6">
                        <div className="flex items-center gap-4">
                            <Badge variant={"secondary"}>Draft</Badge>
                            <Input  name={fields.invoiceName.name} key={fields.invoiceName.key} defaultValue={fields.invoiceName.initialValue} placeholder="Test 123" className="w-fit" />
                        </div>
                        <p className="text-sm text-red-600">{fields.invoiceName.errors}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="">
                            <Label>Invoice No.</Label>
                            <div className="flex">
                                <span className=" border border-r-0 rounded-l-md bg-muted flex items-center  px-3">#</span>
                                <Input type="number" name={fields.invoiceNumber.name} key={fields.invoiceNumber.key} defaultValue={fields.invoiceNumber.initialValue} className="rounded-l-none" placeholder="5" />
                            </div>
                            <p className="text-sm text-red-600">{fields.invoiceNumber.errors}</p>
                        </div>
                        <div className="">
                            <Label>Currency</Label>
                            <Select defaultValue="USD" name={fields.currency.name} key={fields.currency.name} onValueChange={(value) => setCurrency(value)} >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">United State Dollar -- USD</SelectItem>
                                    <SelectItem value="EUR">Euro -- EUR</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-red-600">{fields.currency.errors}</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <Label>From</Label>
                            <div className="space-y-2">
                                <Input  placeholder="Your Name" name={fields.fromName.name} key={fields.fromName.key} defaultValue={firstName + " " + lastName} />
                                <p className="text-sm text-red-600">{fields.fromName.errors}</p>
                                <Input placeholder="Your Email" name={fields.fromEmail.name} key={fields.fromEmail.key} defaultValue={email} />
                                <p className="text-sm text-red-600">{fields.fromEmail.errors}</p>
                                <Input placeholder="Your Address" name={fields.fromAddress.name} key={fields.fromAddress.key} defaultValue={address} />
                                <p className="text-sm text-red-600">{fields.fromAddress.errors}</p>
                            </div>

                        </div>
                        <div>
                            <Label>To</Label>
                            <div className="space-y-2">
                                <Input placeholder="Client Name" name={fields.clientName.name} key={fields.clientName.key} defaultValue={fields.clientName.initialValue} />
                                <p className="text-sm text-red-600">{fields.clientName.errors}</p>
                                <Input placeholder="Client Email" name={fields.clientEmail.name} key={fields.clientEmail.key} defaultValue={fields.clientEmail.initialValue} />
                                <p className="text-sm text-red-600">{fields.clientEmail.errors}</p>
                                <Input placeholder="Client Address" name={fields.clientAddress.name} key={fields.clientAddress.key} defaultValue={fields.clientAddress.initialValue} />
                                <p className="text-sm text-red-600">{fields.clientAddress.errors}</p>
                            </div>
                        </div>

                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <div>
                                <Label>Date</Label>
                            </div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className="w-full justify-start" variant={"outline"}>
                                        <Calendar1Icon />
                                        {selectedDate ? (new Intl.DateTimeFormat("en-US", {
                                            dateStyle: "long",
                                        }).format(selectedDate)) : (<span>Pick a Date</span>)}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar mode="single" fromDate={new Date()} selected={selectedDate} onSelect={(date) => setSelectedDate(date || new Date())} />
                                </PopoverContent>
                            </Popover>
                            <p className="text-sm text-red-600">{fields.date.errors}</p>
                        </div>
                        <div>
                            <div>
                                <Label>Invoice Due</Label>
                            </div>
                            <Select defaultValue="15" name={fields.dueDate.name} key={fields.dueDate.key} >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select due Date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Due on Receipt</SelectItem>
                                    <SelectItem value="15">Net 15</SelectItem>
                                    <SelectItem value="30">Net 30</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-red-600">{fields.dueDate.errors}</p>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-12 mb-2 font-medium">
                            <p className="col-span-6">Description</p>
                            <p className="col-span-2">Quantity</p>
                            <p className="col-span-2">Rate</p>
                            <p className="col-span-2">Amount</p>
                        </div>
                        <div className="grid grid-cols-12 gap-4 mb-4">
                            <div className="col-span-6">
                                <Textarea  name={fields.invoiceItemDescription.name} key={fields.invoiceItemDescription.key} defaultValue={fields.invoiceItemDescription.initialValue} placeholder="Item name & description" />
                                <p className="text-sm text-red-600">{fields.invoiceItemDescription.errors}</p>
                            </div>
                            <div className="col-span-2">
                                <Input value={quantity} onChange={(e) => setQuantity(e.target.value)} name={fields.invoiceItemQuantity.name} key={fields.invoiceItemQuantity.key} defaultValue={fields.invoiceItemQuantity.initialValue} type="number" placeholder="0" />
                                <p className="text-sm  text-red-600">{fields.invoiceItemQuantity.errors}</p>
                            </div>
                            <div className="col-span-2">
                                <Input value={rate} onChange={(e) => setRate(e.target.value)} name={fields.invoiceItemRate.name} key={fields.invoiceItemRate.key} defaultValue={fields.invoiceItemRate.initialValue} type="number" placeholder="0" />
                                <p className="text-sm text-red-600">{fields.invoiceItemRate.errors}</p>
                            </div>
                            <div className="col-span-2">
                                <Input value={formatCurrency({amount : calculateTotal,  currency : currency as "USD" | "EUR"})} disabled />

                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="w-1/3">
                            <div className="flex justify-between py-2">
                                <span>SubTotal</span>
                                <span>$5.00</span>
                            </div>
                            <div className="flex justify-between py-2 border-t">
                                <span>Total ({currency})</span>
                                <span className="font-medium underline underline-offset-4">{formatCurrency({amount : calculateTotal,  currency : currency as "USD" | "EUR"})} </span>
                            </div>

                        </div>
                    </div>
                    <div className="mb-4">
                        <Label>Notes</Label>
                        <Textarea name={fields.note.name} key={fields.note.key} defaultValue={fields.note.initialValue} placeholder="Enter your Notes here..." />
                        <p className="text-sm text-red-600">{fields.note.errors}</p>
                    </div>
                    <div className="flex items-center justify-end">
                        <div>
                           
                            <SubmitButton  text="Send Invoice to Client" />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
