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
  { name: "Inicio", href: "/"  },
  { name: "Especialidades", href: "/especialidad" },
  { name: "Preguntas", href: "/preguntas" },
  { name: "Dashboard", href: "/dashboard"},
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex gap-3">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.name}
          className={`font-p font-small  py-1 px-2 rounded-2xl transition duration-250 delay-100 ease-in-out hover:bg-hover ${pathname === link.href ? "bg-hover text-text-2" : "text-text-3"}`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
