import { signOut } from "next-auth/react";
import {Button} from "@/components/ui/button";

const LogoutButton = () => {
    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    return <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
