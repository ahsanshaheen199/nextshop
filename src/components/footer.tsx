import Link from 'next/link';
import Image from 'next/image';
import { Twitter } from './icons/twitter';
import { Facebook } from './icons/facebook';
import { Instagram } from './icons/instagram';
import { Github } from './icons/github';
import { Envelop } from './icons/envelop';

export function Footer() {
  return (
    <footer>
      <div className="relative z-[1] container mb-[-90px]">
        <div className="grid grid-cols-12 items-center rounded-[20px] bg-black px-6 py-8 lg:px-16 lg:py-9">
          <div className="col-span-12 lg:col-start-1 lg:col-end-8">
            <h2 className="text-[32px] leading-[35px] text-white uppercase lg:text-[40px] lg:leading-[45px]">
              Stay Upto Date About Our Latest Offers
            </h2>
          </div>
          <div className="col-span-12 mt-8 lg:col-start-9 lg:col-end-13 lg:mt-0">
            <form>
              <div className="relative">
                <Envelop className="absolute top-1/2 left-4 -translate-y-1/2 fill-black/40" />
                <input
                  type="email"
                  className="w-full rounded-full bg-white py-3 pr-4 pl-12 text-sm text-black outline-none placeholder:text-black/40 lg:pl-[52px] lg:text-base"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mt-[14px]">
                <button className="block w-full cursor-pointer rounded-full border border-black/20 bg-white py-3 text-center font-satoshi-medium text-sm transition-colors duration-300 ease-in-out hover:border-white hover:bg-black hover:text-white lg:text-base">
                  Subscribe to Newsletter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F0F0] py-14 pt-[140px]">
        <div className="container">
          <div className="mb-12 grid grid-cols-12 gap-y-6 lg:gap-y-0">
            <div className="col-span-12 md:col-span-6 md:max-w-64 lg:col-span-4">
              <h1 className="mb-6 text-3xl leading-[1] font-bold">NextShop</h1>
              <p className="mb-6 text-sm leading-[22px] text-black/60">
                We have cloths that suits your style and which you&apos;re proud to wear. From men to women
              </p>
              <ul className="flex items-center gap-x-3">
                <li>
                  <Link
                    href="!#"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/20 bg-white transition-colors duration-300 ease-in-out hover:border-black hover:bg-black hover:text-white"
                  >
                    <Twitter />
                  </Link>
                </li>
                <li>
                  <Link
                    href="!#"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/20 bg-white transition-colors duration-300 ease-in-out hover:border-black hover:bg-black hover:text-white"
                  >
                    <Facebook />
                  </Link>
                </li>
                <li>
                  <Link
                    href="!#"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/20 bg-white transition-colors duration-300 ease-in-out hover:border-black hover:bg-black hover:text-white"
                  >
                    <Instagram />
                  </Link>
                </li>
                <li>
                  <Link
                    href="!#"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/20 bg-white transition-colors duration-300 ease-in-out hover:border-black hover:bg-black hover:text-white"
                  >
                    <Github />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-6 lg:col-span-2">
              <h3 className="mb-6 font-satoshi-medium text-base leading-[18px] tracking-[3px] text-black uppercase">
                Company
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li className="text-base leading-[19px] text-black/60">About</li>
                <li className="text-base leading-[19px] text-black/60">Features</li>
                <li className="text-base leading-[19px] text-black/60">Works</li>
                <li className="text-base leading-[19px] text-black/60">Career</li>
              </ul>
            </div>
            <div className="col-span-6 lg:col-span-2">
              <h3 className="mb-6 font-satoshi-medium text-base leading-[18px] tracking-[3px] text-black uppercase">
                Help
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li className="text-base leading-[19px] text-black/60">Customer Support</li>
                <li className="text-base leading-[19px] text-black/60">Delivery Details</li>
                <li className="text-base leading-[19px] text-black/60">Terms & Conditions</li>
                <li className="text-base leading-[19px] text-black/60">Privacy Policy</li>
              </ul>
            </div>
            <div className="col-span-6 lg:col-span-2">
              <h3 className="mb-6 font-satoshi-medium text-base leading-[18px] tracking-[3px] text-black uppercase">
                Faq
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li className="text-base leading-[19px] text-black/60">Account</li>
                <li className="text-base leading-[19px] text-black/60">Manage Directives</li>
                <li className="text-base leading-[19px] text-black/60">Orders</li>
                <li className="text-base leading-[19px] text-black/60">Payments</li>
              </ul>
            </div>
            <div className="col-span-6 lg:col-span-2">
              <h3 className="mb-6 font-satoshi-medium text-base leading-[18px] tracking-[3px] text-black uppercase">
                Resources
              </h3>
              <ul className="flex flex-col gap-y-4">
                <li className="text-base leading-[19px] text-black/60">Free eBooks</li>
                <li className="text-base leading-[19px] text-black/60">Development Tutorial</li>
                <li className="text-base leading-[19px] text-black/60">How to - Blog</li>
                <li className="text-base leading-[19px] text-black/60">Youtube Playlist</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/10 pt-6 md:grid md:grid-cols-2 md:items-center">
            <div className="text-center md:text-left">
              <p className="text-sm text-black/60">NextShop {new Date().getFullYear()}. All Rights Reserved.</p>
            </div>
            <div className="mt-4 flex items-center justify-center md:mt-0 md:justify-end">
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
