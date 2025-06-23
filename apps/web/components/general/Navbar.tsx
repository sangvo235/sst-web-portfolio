import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { LoginLink, RegisterLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function Navbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="py-5 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Link href="/">
                    <h1 className="text-3xl font-semibold text-blue-500">Sang Vo</h1>
                </Link>
                
                <div className="hidden sm:flex items-center gap-6">
                    <Link 
                        href="/"
                        className="text-sm font-medium hover:text-blue-500 transition-colors"
                    >
                        Home
                    </Link>
                    <Link 
                        href="/dashboard"
                        className="text-sm font-medium hover:text-blue-500 transition-colors"
                    >
                        Dashboard
                    </Link>
                </div>

                {user ? (
                    <div className="flex items-center gap-4">
                        <p>{user.given_name}</p>
                        <LogoutLink className={buttonVariants({variant: 'secondary'})}>Logout</LogoutLink>
                    </div> 
                ) : (
                    <div className="flex items-center gap-4">
                        <LoginLink className={buttonVariants()}>Login</LoginLink>
                        <RegisterLink className={buttonVariants({variant: 'secondary'})}>Sign Up</RegisterLink>
                    </div>
                )}
            </div>
        </nav>
    )
}

