import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export default function SignOut() {
  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <form action={handleSignOut}>
      <Button type="submit" variant="destructive">
        Sign Out
      </Button>
    </form>
  );
}