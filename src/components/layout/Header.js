import Link from "next/link";
export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link className="text-primary font-semibold text-2xl" href="">
        SRayen PIZZA
      </Link>
      <nav className="flex text-gray-500 gap-8 font-semibold">
        <Link href="">Home</Link>
        <Link href="">Menu</Link>
        <Link href="">About</Link>
        <Link href="">Contact</Link>
        <Link href="" className="bg-primary rounded-full text-white px-8 py-2">
          Login
        </Link>
      </nav>
    </header>
  );
}
