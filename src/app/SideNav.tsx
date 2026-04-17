"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  return (
    <div className="flex items-center justify-center p-2 ">
      <NavLinks />
    </div>
  );
}

const links = [
  { name: "Inicio", href: "/" /* , icon: HomeIcon */ },
  { name: "Materias", href: "/materias" /* , icon: HomeIcon */ },
  { name: "Dashboard", href: "/dashboard" /* , icon: UserGroupIcon  */ },
];

function NavLinks() {
const pathname = usePathname()

  return (
    <div className="flex gap-3">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.name}
          className={`font-p font-small text-text-4 py-1 px-2 rounded-2xl transition delay-150 duration-250 ease-in-out hover:-translate-y-1 hover:bg-hover ${pathname === link.href ? "bg-hover text-text-1" : "text-text-4"}`}
        >
          {link.name}
        </Link>
      ))}    
    </div>
  );
}
