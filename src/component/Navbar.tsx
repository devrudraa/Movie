"use client";
import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "./Icons/Search";
import Logo from "./Icons/Logo";
import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="flex gap-10 items-center justify-between py-3 px-5 bg-black/50 backdrop-blur-sm">
        {isSearchOpen && (
          <div className="w-full flex gap-3 z-10 items-center">
            <Input
              placeholder="Type to search..."
              startContent={
                <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
            <Button onClick={() => setIsSearchOpen(false)} isIconOnly>
              X
            </Button>
          </div>
        )}
        {!isSearchOpen && (
          <>
            <Link href={"/"}>
              <Logo />
            </Link>{" "}
            <Input
              isClearable
              className="w-full max-w-xl hidden md:block"
              radius="lg"
              placeholder="Type to search..."
              startContent={
                <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
            <div className="flex gap-1">
              <Button
                variant="light"
                isIconOnly
                className=" md:hidden flex items-center justify-center"
                onClick={() => setIsSearchOpen(true)}
              >
                <SearchIcon className="text-white pointer-events-none text-xl" />
              </Button>

              <Button as={Link} href="/favorite" color="primary">
                Favorite List
              </Button>
            </div>
          </>
        )}
      </nav>
    </>
  );
}
