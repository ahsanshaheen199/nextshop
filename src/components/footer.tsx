import Link from "next/link";
import Image from "next/image";
import { Twitter } from "./icons/twitter";
import { Facebook } from "./icons/facebook";
import { Instagram } from "./icons/instagram";
import { Github } from "./icons/github";
import { Envelop } from "./icons/envelop";

export function Footer() {
  return (
    <footer>
      <div className="container mb-[-90px] relative z-[1]">
        <div className="bg-black rounded-[20px] px-6 py-8 lg:py-9 lg:px-16 grid grid-cols-12 items-center">
          <div className="lg:col-start-1 lg:col-end-8 col-span-12">
            <h2 className="lg:text-[40px] lg:leading-[45px] text-[32px] leading-[35px] text-white uppercase">
              Stay Upto Date About Our Latest Offers
            </h2>
          </div>
          <div className="lg:col-start-9 lg:col-end-13 col-span-12 mt-8 lg:mt-0">
            <form>
              <div className="relative">
                <Envelop className="absolute top-1/2 left-4 -translate-y-1/2 fill-black/40" />
                <input
                  type="email"
                  className="bg-white w-full rounded-full text-sm lg:text-base placeholder:text-black/40 lg:pl-[52px] pl-12 py-3 pr-4 text-black outline-none"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mt-[14px]">
                <button className="w-full block bg-white rounded-full text-sm lg:text-base font-satoshi-medium py-3 text-center cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 ease-in-out border border-black/20 hover:border-white">
                  Subscribe to Newsletter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F0F0] pt-[140px] py-14">
        <div className="container">
          <div className="grid grid-cols-12 mb-12 gap-y-6 lg:gap-y-0">
            <div className="lg:col-span-4 md:col-span-6 md:max-w-64 col-span-12">
              <h1 className="text-3xl font-bold mb-6 leading-[1]">NextShop</h1>
              <p className="text-sm text-black/60 leading-[22px] mb-6">
                We have cloths that suits your style and which you&apos;re proud
                to wear. From men to women
              </p>
              <ul className="flex items-center gap-x-3">
                <li>
                  <Link
                    href="!#"
                    className="w-7 h-7 rounded-full border border-black/20 bg-white inline-flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    <Twitter />
                  </Link>
                </li>
                <li>
                  <Link
                    href="!#"
                    className="w-7 h-7 rounded-full border border-black/20 bg-white inline-flex items-center justify-center hover:bg-black hover:border-black hover:text-white  transition-colors duration-300 ease-in-out"
                  >
                    <Facebook />
                  </Link>
                </li>
                <li>
                  <Link
                    href="!#"
                    className="w-7 h-7 rounded-full border border-black/20 bg-white inline-flex items-center justify-center hover:bg-black hover:border-black hover:text-white  transition-colors duration-300 ease-in-out"
                  >
                    <Instagram />
                  </Link>
                </li>
                <li>
                  <Link
                    href="!#"
                    className="w-7 h-7 rounded-full border border-black/20 bg-white inline-flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    <Github />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 col-span-6">
              <h3 className="font-satoshi-medium tracking-[3px] text-base leading-[18px] text-black mb-6 uppercase">
                Company
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li className="text-base leading-[19px] text-black/60">
                  About
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  Features
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  Works
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  Career
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 col-span-6">
              <h3 className="font-satoshi-medium tracking-[3px] text-base leading-[18px] text-black mb-6 uppercase">
                Help
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li className="text-base leading-[19px] text-black/60">
                  Customer Support
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  Delivery Details
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  Terms & Conditions
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  Privacy Policy
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 col-span-6">
              <h3 className="font-satoshi-medium tracking-[3px] text-base leading-[18px] text-black mb-6 uppercase">
                Faq
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li className="text-base leading-[19px] text-black/60">
                  Account
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  Manage Directives
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  Orders
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  Payments
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 col-span-6">
              <h3 className="font-satoshi-medium tracking-[3px] text-base leading-[18px] text-black mb-6 uppercase">
                Resources
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li className="text-base leading-[19px] text-black/60">
                  Free eBooks
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  Development Tutorial
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  How to - Blog
                </li>
                <li className="text-base leading-[19px] text-black/60">
                  Youtube Playlist
                </li>
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:items-center border-t border-black/10 pt-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-black/60">
                NextShop {new Date().getFullYear()}. All Rights Reserved.
              </p>
            </div>
            <div className="flex md:justify-end justify-center mt-4 md:mt-0 items-center">
              <Image width={50} height={40} src="/visa.svg" alt="visa" />
              <Image width={50} height={40} src="/mastercard.svg" alt="visa" />
              <Image width={50} height={40} src="/paypal.svg" alt="visa" />
              <Image width={50} height={40} src="/applepay.svg" alt="visa" />
              <Image width={50} height={40} src="/googlepay.svg" alt="visa" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
