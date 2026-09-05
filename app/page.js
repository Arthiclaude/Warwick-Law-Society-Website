import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Warwick Law Society</h1>
        <p>The home of Warwick Law Society online.</p>
        <div className="hero-actions">
          <Link href="/login" className="button-primary">
            Member Login
          </Link>
        </div>
      </section>
      <section>
        <h2>Members Area</h2>
        <p>
          Warwick Law Society members get access to an exclusive members area
          with an application tracker, an alumni network, and a commercial
          awareness forum. Log in with your Warwick SU membership key to get
          started.
        </p>
      </section>
    </main>
  );
}
