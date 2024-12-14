"use server";

import { requiredUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod"
import { onboardingSchema } from "./utils/zodSchema";

export async function onboardUser(formData: FormData) {
    await requiredUser();

    const submission = parseWithZod(formData, {
        schema: onboardingSchema,
    })



}

