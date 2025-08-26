import React, { useEffect, useState } from "react";
import { getMembers } from "../api";

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers()
      .then((res) => {
        setMembers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
      });
  }, []);

  return (
    <div>
      <h2>Members</h2>
      <ul>
        {members.map((m) => (
          <li key={m.id}>
            {m.name} — {m.membership_plan} ({m.payment_status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
