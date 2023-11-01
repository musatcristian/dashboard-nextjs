"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, EventHandler, FC } from "react";
import { useDebouncedCallback } from "use-debounce";

import { textFont } from "./fonts";

interface ISearchParams {
  placeholder: string;
}

const Search: FC<ISearchParams> = ({ placeholder }) => {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch: EventHandler<ChangeEvent<HTMLInputElement>> =
    useDebouncedCallback((e) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      const { value: term } = e.target;

      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
    }, 300);

  return (
    <div className={`${textFont.className} relative flex flex-1 flex-shrink-0`}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};

export default Search;
