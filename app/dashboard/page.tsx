
import { redirect } from "next/navigation";
import { auth, signOut } from "../utils/auth";
import { DashboardBlocks } from "../components/DashboardBlocks";





export default async function Dashboard() {
    const session = await auth();
    if (!session?.user) {
        redirect("/login")
    }


    return (
        <div className="">
            <DashboardBlocks />
        </div>
    );
}
