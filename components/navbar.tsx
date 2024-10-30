"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Building2, LandPlot } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <LandPlot className="h-6 w-6" />
          <span className="font-bold">LandRegistry</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/properties">
            <Button variant="ghost">Properties</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost">Contact</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="default">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline">Register</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}