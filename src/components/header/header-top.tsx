"use client";

import Link from "next/link";
import { useState } from "react";
import { Cross } from "../icons/cross";

export const HeaderTop = () => {
  const [show, setShow] = useState(true);
  return show ? (
    <div className="bg-black py-2">
      <div className="container">
        <div className="relative">
          <p className="text-center text-white text-sm">
            Sign up and get 20% off to your first order.{" "}
            <Link href="!#" className="font-bold underline">
              Sign Up Now
            </Link>
          </p>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-0 hidden md:block cursor-pointer"
            onClick={() => {
              setShow(false);
            }}
          >
            <Cross />
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
