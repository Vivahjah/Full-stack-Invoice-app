
import { redirect } from "next/navigation";
import { auth, signOut } from "../utils/auth";




export default async function Dashboard() {
    const session = await auth();
    if (!session?.user) {
        redirect("/login")
    }


    return (
        <div className=""></div>
    );
}
