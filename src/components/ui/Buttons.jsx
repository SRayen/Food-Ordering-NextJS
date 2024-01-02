"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Avatar } from "@nextui-org/react";

export default function Buttons() {
  const session = useSession();
  const userImage = session?.data?.user?.image;
  const { status } = session;

  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName?.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <>
      {status === "authenticated" ? (
        <div>
          <div className="flex gap-3 items-center">
            <Link
              href={"/profile"}
              className="text-xl font-bold text-green-900"
            >
              Hello, <span className="underline">{userName}</span>
            </Link>

            <Avatar
              color={"primary"}
              isBordered
              src={userImage ? userImage : "/profile.png"}
            />

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
