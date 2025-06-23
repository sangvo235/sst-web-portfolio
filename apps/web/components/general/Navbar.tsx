import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { LoginLink, RegisterLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { RiHomeLine } from "react-icons/ri";

export async function Navbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="w-7/8 mx-auto fixed top-0 z-50 bg-white">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-b">
                <div className="flex items-center gap-8">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <RiHomeLine className="text-3xl text-blue-500" />
                        <h1 className="text-3xl font-semibold text-blue-500 m-0">Sang Vo</h1>
                    </div>
                    </Link>

                    <div className="flex items-center gap-6">
                    <Link href="/" className="text-md font-medium hover:text-blue-500 transition-colors">
                        Home
                    </Link>
                    <Link href="/blogs" className="text-md font-medium hover:text-blue-500 transition-colors">
                        Blogs
                    </Link>
                    <Link href="/" className="text-md font-medium hover:text-blue-500 transition-colors">
                        Experience
                    </Link>
                    <Link href="/" className="text-md font-medium hover:text-blue-500 transition-colors">
                        Education
                    </Link>
                    <Link href="/" className="text-md font-medium hover:text-blue-500 transition-colors">
                        Projects
                    </Link>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <p className="text-md font-medium">{user.given_name}</p>
                        <LogoutLink className={buttonVariants({ variant: "secondary" })}>Logout</LogoutLink>
                    </>
                    ) : (
                    <>
                        <LoginLink className={buttonVariants()}>Login</LoginLink>
                        <RegisterLink className={buttonVariants({ variant: "secondary" })}>Sign Up</RegisterLink>
                    </>
                    )}
                </div>
            </div>

        </nav>
    )
}

