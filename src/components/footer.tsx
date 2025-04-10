export function Footer() {
  return (
    <footer>
      <div className="container mx-auto">
        <div className="bg-black rounded-[20px] py-9 px-16 grid grid-cols-12 items-center">
          <div className="col-start-1 col-end-7">
            <h2 className="text-[40px] leading-[45px] text-white uppercase">
              Stay Upto Date About Our Latest Offers
            </h2>
          </div>
          <div className="col-start-9 col-end-13">
            <form>
              <div className="relative">
                <img
                  src="/envelop.svg"
                  className="absolute top-1/2 left-4 -translate-y-1/2"
                />
                <input
                  type="email"
                  className="bg-white w-full rounded-full text-base placeholder:text-black/40 pl-[52px] py-3 pr-4 text-black outline-none"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mt-[14px]">
                <button className="w-full block bg-white rounded-full text-base font-satoshi-medium py-3 text-center cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 ease-in-out border border-black/20 hover:border-white">
                  Subscribe to Newsletter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F0F0] pt-[140px] py-14">
        <div className="container mx-auto">
          <div className="flex justify-between mb-12">
            <div className="max-w-64">
              <h1 className="text-3xl font-bold mb-6">NextShop</h1>
              <p className="text-sm text-black/60 leading-[22px] mb-8">
                We have cloths that suits your style and which you're proud to
                wear. From men to women;
              </p>
            </div>
            <div>
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
            <div>
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
            <div>
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
            <div>
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
          <div className="grid grid-cols-2 items-center border-t border-black/10 pt-6">
            <div>
              <p className="text-sm text-black/60">
                NextShop {new Date().getFullYear()}. All Rights Reserved.
              </p>
            </div>
            <div className="flex justify-end items-center">
              <img src="/visa.svg" alt="visa" />
              <img src="/mastercard.svg" alt="visa" />
              <img src="/paypal.svg" alt="visa" />
              <img src="/applepay.svg" alt="visa" />
              <img src="/googlepay.svg" alt="visa" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
