import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "./Icons/Search";
import Logo from "./Icons/Logo";

export default function Nav() {
  return (
    <nav className="flex gap-10 items-center justify-between py-3 px-5">
      <label htmlFor="">
        <Logo />
      </label>
      <Input
        isClearable
        className="w-full max-w-xl"
        radius="lg"
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
      <Button color="primary">Fav</Button>
    </nav>
  );
}
