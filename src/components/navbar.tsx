import { Props } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function NavBar({ params: { locale } }: Props) {
  return (
    <header>
      <div className="navbar bg-primary text-white p-3">
        <div className="flex-1">
          <a href="/">
            <Image
              src="/favicon.ico"
              width={50}
              height={50}
              alt="Burmese Jewellery"
            />
          </a>
        </div>

        <div className="flex-none gap-2">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={`/${locale}/admin/dashboard`}>Admin</Link>
            </li>
            <li>
              <Link href={`/${locale}/login`}>Login</Link>
            </li>
            <li>
              <Link href={`/${locale}/register`}>Register</Link>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile Icon"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Cart</a>
              </li>
              <li>
                <a>Order</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
