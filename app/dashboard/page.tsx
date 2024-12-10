
import { redirect } from "next/navigation";
import { auth, signOut } from "../utils/auth";




export default async function Dashboard() {
    const session = await auth();
    if (!session?.user) {
        redirect("/login")
    }


    return (
        <div className="">
            <h1>This is the Dashboard Page</h1>
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </div>
    );
}
