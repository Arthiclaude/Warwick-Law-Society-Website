import Link from "next/link";
import LogoutButton from "./LogoutButton";

export const metadata = { title: "Members Area | Warwick Law Society" };

export default function MembersHomePage() {
  return (
    <main className="container">
      <div className="page-header">
        <h1>Members Area</h1>
        <LogoutButton />
      </div>
      <p>Welcome, verified Warwick Law Society member. Exclusive resources:</p>
      <div className="card-grid">
        <Link href="/members/tracker" className="card">
          <h2>Application Tracker</h2>
          <p>Key vacation scheme and training contract deadlines.</p>
        </Link>
        <Link href="/members/alumni" className="card">
          <h2>Alumni Network</h2>
          <p>Connect with Warwick Law alumni now working in Big Law.</p>
        </Link>
        <Link href="/members/forum" className="card">
          <h2>Commercial Awareness Forum</h2>
          <p>Discuss commercial news and legal developments with other members.</p>
        </Link>
      </div>
    </main>
  );
}
