import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function InvoicePage(){
    return(
        <Card>
            <CardHeader>
                <div className="flex items-center justiify-between">
                    <div>
                        <CardTitle>Invoices</CardTitle>
                        <CardDescription>Manage your Invoices</CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}