// Committee members can edit this list directly - add or update rows here,
// no other code needs to change.
const alumni = [
  {
    name: "Add your first alumni entry",
    gradYear: "20XX",
    firm: "e.g. Slaughter and May",
    role: "e.g. Trainee Solicitor",
    linkedin: "",
  },
];

export const metadata = { title: "Alumni Network | Warwick Law Society" };

export default function AlumniPage() {
  return (
    <main className="container">
      <h1>Alumni Network</h1>
      <p>
        A directory of Warwick Law alumni now working in commercial law
        firms, for members to reach out to for advice and insight.
      </p>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Graduated</th>
            <th>Firm</th>
            <th>Role</th>
            <th>LinkedIn</th>
          </tr>
        </thead>
        <tbody>
          {alumni.map((person) => (
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.gradYear}</td>
              <td>{person.firm}</td>
              <td>{person.role}</td>
              <td>
                {person.linkedin ? (
                  <a href={person.linkedin} target="_blank" rel="noreferrer">
                    Profile
                  </a>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
