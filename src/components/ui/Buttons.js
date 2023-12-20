import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
export default function Buttons() {
  const session = useSession();
  console.log("session===>", session);
  const status = session.status;
  return (
    <>
      {status === "authenticated" ? (
        <div>
          {" "}
          <Button
            as={Link}
            color="secondary"
            href="/register"
            variant="flat"
            onClick={() => signOut()}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Button as={Link} color="secondary" href="/register" variant="flat">
            Sign Up
          </Button>
          <Button as={Link} color="primary" href="/login" variant="flat">
            Sign In
          </Button>
        </div>
      )}
    </>
  );
}
