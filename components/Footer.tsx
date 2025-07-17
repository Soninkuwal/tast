
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#fdd835]">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#fdd835]">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/payments" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  Payments
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  Cancellation & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#fdd835]">Social</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center space-x-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-facebook-fill"></i>
                  </div>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center space-x-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-twitter-fill"></i>
                  </div>
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center space-x-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-instagram-fill"></i>
                  </div>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center space-x-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-youtube-fill"></i>
                  </div>
                  <span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#fdd835]">Policy</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/return-policy" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-[#fdd835] hover:translate-x-1 transition-all duration-200 cursor-pointer">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Flipkart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
