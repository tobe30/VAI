import { Eye, MenuIcon, XIcon, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { navlinks } from "../data/navlinks";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-0 z-50 h-20 flex items-center justify-between w-full px-6 md:px-16 backdrop-blur"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >


 <a href="https://prebuiltui.com?utm_source=pixels">
<img
src="/assets/vai.png"
      alt="VAI logo"
      className="h-30 w-auto object-contain"
/>

                </a>


        <div className="hidden md:flex items-center gap-8 transition duration-500">
          {navlinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className="hover:text-blue-500 transition"
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <button className="hidden md:block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all rounded-full">
          Start free trial
        </button>

        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <MenuIcon size={26} className="active:scale-90 transition" />
        </button>
      </motion.nav>

      <div
        className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {navlinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.href}
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </NavLink>
        ))}

        <button
          onClick={() => setIsOpen(false)}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-blue-600 hover:bg-blue-700 transition text-white rounded-md flex"
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}
