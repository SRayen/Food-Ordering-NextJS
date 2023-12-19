import { Button } from "@nextui-org/react";
import Link from "next/link";
export default function Buttons() {
  return (
    <>
      <Button as={Link} color="secondary" href="/register" variant="flat">
        Sign Up
      </Button>
      <Button as={Link} color="primary" href="#" variant="flat">
        Sign In
      </Button>
    </>
  );
}
