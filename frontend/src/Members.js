import React, { useEffect, useState } from "react";
import axios from "axios";

function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch members from backend API
    axios
      .get("http://localhost:5000/api/members")
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.error("❌ Error fetching members:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👥 Gym Members</h2>
      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              {member.name} — {member.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Members;
