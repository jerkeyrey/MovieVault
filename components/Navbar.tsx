import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="navbar flex justify-between items-center p-4">
      <h3 className="navbar-title text-2xl font-bold">MovieVault</h3>

      <div className="flex gap-4">
        <Button className="bookmark-btn" variant="secondary">
          Bookmarks
        </Button>

        {session ? <SignOut /> : <SignIn />}
      </div>
    </nav>
  );
};

export default Navbar;
