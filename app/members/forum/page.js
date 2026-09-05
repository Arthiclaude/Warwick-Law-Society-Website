const threads = [
  {
    title: "Welcome to the Commercial Awareness Forum",
    author: "Warwick Law Society",
    replies: 0,
    summary:
      "Use this space to discuss commercial news, deals, and legal developments relevant to training contract applications.",
  },
];

export const metadata = { title: "Commercial Awareness Forum | Warwick Law Society" };

export default function ForumPage() {
  return (
    <main className="container">
      <h1>Commercial Awareness Forum</h1>
      <p>Discuss commercial news and legal developments with other members.</p>
      <div>
        {threads.map((thread) => (
          <div className="thread" key={thread.title}>
            <h3>{thread.title}</h3>
            <p className="thread-meta">
              Posted by {thread.author} &middot; {thread.replies} replies
            </p>
            <p>{thread.summary}</p>
          </div>
        ))}
      </div>
      <p className="notice">
        This is a preview with sample content. Letting members post their own
        threads and replies needs a database to store posts and a way to tell
        members apart - a good next step once this page is live.
      </p>
    </main>
  );
}
