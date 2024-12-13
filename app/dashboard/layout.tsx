import { ReactNode } from "react";
import { requiredUser } from "../utils/hooks";

export default async function DashboardLayout({children}:{children : ReactNode}) {
     await requiredUser();
    return(
        <>
        
        <div>Hello DLayout</div>
        <div>{children}</div>
        </>
    )
}  