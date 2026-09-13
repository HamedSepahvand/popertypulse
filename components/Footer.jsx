import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-auto bottom-0 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center text-center">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties">Properties</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-500">
            &copy; 2026 PropertyPulse. All rights reserved by{" "}
            <a
              href="https://github.com/hamedsepahvand"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
            >
              Hamed Sepahvand
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;