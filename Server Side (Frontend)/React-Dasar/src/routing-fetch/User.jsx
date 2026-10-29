import { useState, useEffect } from "react";

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      if (!response.ok) {
        alert("Gagal mengambil data");
        return;
      }
      const data = await response.json();
      setUsers(data);
    }
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Daftar user dari dummy api</h1>
      <table style={{ borderCollapse: "collapse", border: "2px solid black" }}>
        <thead>
          <tr>
            <th
              style={{
                padding: "5px",
                border: "2px solid black",
                backgroundColor: "lightblue",
              }}
            >
              Id
            </th>
            <th
              style={{
                padding: "5px",
                border: "2px solid black",
                backgroundColor: "lightblue",
              }}
            >
              Nama
            </th>
            <th
              style={{
                padding: "5px",
                border: "2px solid black",
                backgroundColor: "lightblue",
              }}
            >
              Usernama
            </th>
            <th
              style={{
                padding: "5px",
                border: "2px solid black",
                backgroundColor: "lightblue",
              }}
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((e, i) => (
            <tr key={i}>
              <td style={{ padding: "5px", border: "2px solid black" }}>
                {e.id}
              </td>
              <td style={{ padding: "5px", border: "2px solid black" }}>
                {e.name}
              </td>
              <td style={{ padding: "5px", border: "2px solid black" }}>
                {e.username}
              </td>
              <td style={{ padding: "5px", border: "2px solid black" }}>
                {e.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
