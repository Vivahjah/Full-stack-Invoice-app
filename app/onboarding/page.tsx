import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../components/SubmitButton";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl">You are almost there</CardTitle>
                    <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action="" className="flex flex-col gap-4"  >
                        <div className="flex gap-3">
                            <div className="flex flex-col gap-2">
                                <Label>First Name</Label>
                                <Input placeholder="John" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Last Name</Label>
                                <Input placeholder="Smith" />
                            </div>
                        </div>
                        <div className=" flex flex-col gap-2">
                            <Label>Address</Label>
                            <Input placeholder="123D Chad Street" />
                        </div>
                        <SubmitButton text="Finish onboarding" />

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}