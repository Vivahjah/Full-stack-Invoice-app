
import { redirect } from "next/navigation";
import { auth, signOut } from "../utils/auth";
import { DashboardBlocks } from "../components/DashboardBlocks";
import InvoiceGraph from "../components/InvoiceGraph";





export default async function Dashboard() {
    const session = await auth();
    if (!session?.user) {
        redirect("/login")
    }


    return (
        <div className="">
            <DashboardBlocks />
            <div className="grid gap-4 mt-6 lg:grid-cols-3 md:gap-8">
               <InvoiceGraph />
                <div className="col-span-1 bg-blue-500">Hello</div>
            </div>
        </div>
    );
}
