const { pool } = require("../config/db");

// ✅ Get all members
const getMembers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM members");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching members:", err.message);
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Get member by ID
const getMemberById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM members WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error fetching member:", err.message);
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Add new member
const addMember = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const [result] = await pool.query(
      "INSERT INTO members (name, email, phone) VALUES (?, ?, ?)",
      [name, email, phone]
    );

    res.status(201).json({ id: result.insertId, name, email, phone });
  } catch (err) {
    console.error("❌ Error adding member:", err.message);
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Update member
const updateMember = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const [result] = await pool.query(
      "UPDATE members SET name = ?, email = ?, phone = ? WHERE id = ?",
      [name, email, phone, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json({ id: req.params.id, name, email, phone });
  } catch (err) {
    console.error("❌ Error updating member:", err.message);
    res.status(500).json({ error: "Database error" });
  }
};

// ✅ Delete member
const deleteMember = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM members WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json({ message: "✅ Member deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting member:", err.message);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = {
  getMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
