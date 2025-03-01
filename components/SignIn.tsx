import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

export default function SignIn() {
  const handleSignIn = async () => {
    "use server";
    await signIn("github");
  };

  return (
    <form action={handleSignIn}>
      <Button type="submit" variant="default">
        Sign In
      </Button>
    </form>
  );
}