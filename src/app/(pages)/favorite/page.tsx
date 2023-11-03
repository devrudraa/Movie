"use client";
import Dot from "@/component/Icons/Dot";
import Star from "@/component/Icons/Star";
import { Button } from "@nextui-org/react";
import Image from "next/image";

import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { Sort } from "@/lib/Constant";
import Bin from "@/component/Icons/Bin";

const Page = () => {
  return (
    <main className="space-y-5 min-h-screen">
      <h1 className="headingSection">Your Favorite</h1>
      <div className="w-full bg-gray-800/90 p-3 rounded-lg flex justify-between md:items-center flex-col md:flex-row">
        <span>1 Titles</span>
        <Select label="Sort" className="max-w-xs w-full" size="sm">
          {Sort.map((sort) => (
            <SelectItem key={sort.value} value={sort.value}>
              {sort.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="p-5 bg-cardBackground rounded-xl w-fit space-y-5">
        <Image
          src={"/movieThub.png"}
          width={200}
          height={200}
          alt="Movie Thumb"
          className="rounded-lg mx-auto"
        />
        <div className="space-y-8 flex flex-col pb-10 max-w-xs">
          <div className="space-y-2">
            <div>
              <h1 className="text-xl font-semibold">
                Mid-Season Trailer - Season 2
              </h1>
            </div>
            <div className="flex gap-1 items-center">
              <Star size={15} />
              <label htmlFor="rating" className="text-xs">
                7.6 / 10
              </label>
              <Dot />
              <Star color="#507adc" size={18} />
              <label htmlFor="rating" className="text-xs">
                3
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="headingSectionSecondary">Your review</h1>
            <p className="flex-1">
              The mercurial villain Loki resumes his role as the God of Mischief
              in a new series that takes place after the events of
              &quot;Avengers: Endgame.&quot;
            </p>
          </div>
        </div>
        <Button color="danger" className="w-full">
          <Bin />
          Remove
        </Button>
      </div>
    </main>
  );
};
export default Page;
