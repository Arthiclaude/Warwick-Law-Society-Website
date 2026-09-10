// Committee members can edit this list directly - add or update rows here,
// no other code needs to change.
const applicationWindows = [
  {
    firm: "Add your first firm",
    scheme: "e.g. Vacation Scheme",
    opens: "TBC",
    deadline: "TBC",
  },
];

export const metadata = { title: "Application Tracker | Warwick Law Society" };

export default function TrackerPage() {
  return (
    <main className="container">
      <h1>Application Tracker</h1>
      <p>
        Key application windows and deadlines for vacation schemes and
        training contracts, kept in one place for members.
      </p>
      <table className="data-table">
        <thead>
          <tr>
            <th>Firm</th>
            <th>Scheme</th>
            <th>Opens</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {applicationWindows.map((row) => (
            <tr key={row.firm}>
              <td>{row.firm}</td>
              <td>{row.scheme}</td>
              <td>{row.opens}</td>
              <td>{row.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="notice">
        This is a shared reference list maintained by the committee. A
        personal tracker where each member logs their own applications would
        need member accounts and a database - a good next step once this page
        is live.
      </p>
    </main>
  );
}
