import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Warwick Law Society",
  description: "Warwick Law Society official website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container site-header-inner">
            <Link href="/" className="site-title">
              Warwick Law Society
            </Link>
            <nav className="site-nav">
              <Link href="/">Home</Link>
              <Link href="/members">Members Area</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Warwick Law Society</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
