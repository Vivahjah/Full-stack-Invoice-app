
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth, signIn } from "../utils/auth";
import SubmitButton from "../components/SubmitButton";

import { redirect } from "next/navigation";


export default async function Login() {
    const session = await auth();
    if (session?.user) {
        redirect("/dashboard")
    }
    return (
        <div className="flex w-full h-screen px-4 justify-center items-center">
            <Card className="max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl" >Login</CardTitle>
                    <CardDescription>Enter your Email to Login to your Account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={async (formData) => {
                        "use server"
                        await signIn("nodemailer", formData)
                    }} className="flex flex-col gap-y-2" >
                        <div className="flex flex-col gap-y-2">
                            <Label>Email</Label>
                            {/* Imput should have name, type propertiy to work */}
                            <Input name="email" type="email" required placeholder="Hello@hello.com" />
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>

            </Card>


        </div>
    )
}

