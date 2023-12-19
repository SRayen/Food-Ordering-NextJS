"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/react";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Menu", href: "/" },
    { title: "About", href: "/" },
    { title: "Contact", href: "/" },
  ];

  return (
    <header className="flex items-center justify-between font-poppins font-xl">
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link
              className="animate-bounce text-primary font-semibold text-2xl"
              href="/"
            >
              SRayen PIZZA
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {menuItems.map((item) => (
          <NavbarContent
            className="hidden sm:flex gap-4"
            justify="center"
            key={item.title}
          >
            <NavbarItem>
              <Link
                color="foreground"
                href={item.href}
                className="font-extrabold hover:text-green-800 duration-150 ease-in-out"
              >
                {item.title}
              </Link>
            </NavbarItem>
          </NavbarContent>
        ))}

        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="secondary" href="/register" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign In
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={item.title}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
}
