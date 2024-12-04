import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function Login() {
    return (
        <div className="flex w-full h-screen px-4 justify-center items-center">
            <Card className="max-w-sm">
                <CardHeader>
                    <CardTitle  className="text-2xl" >Login</CardTitle>
                    <CardDescription>Enter your Email to Login to your Account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-y-2" >
                        <div className="flex flex-col gap-y-2">
                            <Label>Email</Label>
                            <Input placeholder="Hello@hello.com" />
                        </div>
                        <Button>Submit</Button>
                    </form>
                </CardContent>

            </Card>


        </div>
    )
}

