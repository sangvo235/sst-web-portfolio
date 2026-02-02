"use client";

import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import ThemeToggle from "@/components/general/ThemeToggle";
import { buttonVariants } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAV_ITEMS = [
  { label: "Blogs", page: "blogs" },
  { label: "Education", page: "education" },
  { label: "Experience", page: "experience" },
  { label: "Projects", page: "projects" },
];

interface NavbarProps {
  user: {
    given_name?: string | null;
    picture?: string | null;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [navbar, setNavbar] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="w-full mx-auto shadow fixed top-0 z-50 bg-white px-8 dark:border-stone-900 dark:border-b dark:border-stone-500 dark:bg-stone-800">
      <div className="justify-between md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3">
            <Link href="/">
              <div className="md:py-5 md:block">
                <h1 className="text-3xl font-semibold text-blue-500 dark:text-blue-400">
                  Sang Vo
                </h1>
              </div>
            </Link>
            <div className="md:hidden">
              <button onClick={() => setNavbar(!navbar)}>
                {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div
            className={`flex-1 justify-self-center pb-4 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center space-x-4 lg:space-x-12">
              {NAV_ITEMS.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/${item.page}`}
                  className="text-md font-medium hover:text-blue-500 transition-colors"
                  onClick={() => setNavbar(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-2">
                      <p className="text-md font-semibold">{user.given_name}</p>
                      <Avatar>
                        <AvatarImage
                          src={user.picture ?? ""}
                          alt={user.given_name ?? "User"}
                        />
                        <AvatarFallback>
                          {user.given_name?.[0] ?? "U"}
                        </AvatarFallback>
                      </Avatar>

                      <ThemeToggle />
                    </div>

                    <LogoutLink
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      Logout
                    </LogoutLink>
                  </>
                ) : (
                  <>
                    <LoginLink className={buttonVariants()}>Login</LoginLink>
                    <RegisterLink
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      Sign Up
                    </RegisterLink>
                    <ThemeToggle />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
