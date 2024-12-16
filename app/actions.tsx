"use server";

import { requiredUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod"
import { onboardingSchema } from "./utils/zodSchema";
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

return redirect("/dashoard")

}

