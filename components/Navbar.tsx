import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="navbar flex justify-between items-center p-4">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <h3 className="navbar-title text-2xl font-bold">MovieVault</h3>
      </Link>

      <div className="flex gap-4">
        <Link href="/bookmarks">
          <Button className="bookmark-btn" variant="secondary">
            Bookmarks
          </Button>
        </Link>

        {session ? <SignOut /> : <SignIn />}
      </div>
    </nav>
  );
};

export default Navbar;
