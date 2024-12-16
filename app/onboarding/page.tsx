"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../components/SubmitButton";
import { useActionState } from "react";
import { onboardUser } from "../actions";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchema";

export default function OnboardingPage() {

    const [lastResult, formAction] = useActionState(onboardUser, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: onboardingSchema,
            })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    })

    console.log(form)
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl">You are almost there</CardTitle>
                    <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} onSubmit={form.onSubmit} id={form.id} noValidate className="flex flex-col gap-4"
                    >
                        <div className="flex gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>First Name</Label>
                                <Input name={fields.firstName.name} defaultValue={fields.firstName.initialValue} key={fields.firstName.key} placeholder="John" />
                                <p className="text-red-500 text-sm">{fields?.firstName.errors} </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Last Name</Label>
                                <Input name={fields.lastName.name} defaultValue={fields.lastName.initialValue} key={fields.lastName.key} placeholder="Smith" />
                                <p className="text-red-500 text-sm">{fields?.lastName.errors} </p>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2">
                            <Label>Address</Label>
                            <Input name={fields.address.name} defaultValue={fields.address.initialValue} key={fields.address.key} placeholder="123D Chad Street" />
                            <p className="text-red-500 text-sm">{fields?.address.errors} </p>

                        </div>
                        <SubmitButton text="Finish onboarding" />

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}