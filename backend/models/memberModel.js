// models/memberModel.js
const { pool } = require("../config/db");

// Helper: calculate expiry date
function calculateExpiry(joiningDate, durationMonths) {
  const start = new Date(joiningDate);
  start.setMonth(start.getMonth() + Number(durationMonths));
  return start.toISOString().split("T")[0]; // YYYY-MM-DD
}

const Member = {
  // CREATE
  async create(data) {
    const expiry_date = calculateExpiry(data.joining_date, data.duration_months);
    const [result] = await pool.query(
      `INSERT INTO members 
      (name, age, gender, phone, email, address, weight, joining_date, duration_months, plan, 
       amount_paid, total_price, balance_amount, payment_status, expiry_date, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.age,
        data.gender,
        data.phone,
        data.email,
        data.address,
        data.weight,
        data.joining_date,
        data.duration_months,
        data.plan,
        data.amount_paid || 0,
        data.total_price || 0,
        data.balance_amount || (data.total_price - data.amount_paid),
        data.payment_status || "Pending",
        expiry_date,
        "Active",
      ]
    );
    return { id: result.insertId, ...data, expiry_date, status: "Active" };
  },

  // READ
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM members ORDER BY id DESC");
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM members WHERE id = ?", [id]);
    return rows[0];
  },

  async search(query) {
    const [rows] = await pool.query(
      "SELECT * FROM members WHERE name LIKE ? OR phone LIKE ? OR email LIKE ?",
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    return rows;
  },

  async findByStatus(status) {
    const [rows] = await pool.query("SELECT * FROM members WHERE status = ?", [status]);
    return rows;
  },

  // UPDATE
  async update(id, data) {
    const [result] = await pool.query("UPDATE members SET ? WHERE id = ?", [data, id]);
    return result.affectedRows;
  },

  async updateWeight(id, weight) {
    const [result] = await pool.query("UPDATE members SET weight = ? WHERE id = ?", [weight, id]);
    return result.affectedRows;
  },

  async updatePayment(id, amount_paid, balance_amount, payment_status) {
    const [result] = await pool.query(
      "UPDATE members SET amount_paid=?, balance_amount=?, payment_status=? WHERE id=?",
      [amount_paid, balance_amount, payment_status, id]
    );
    return result.affectedRows;
  },

  async renewMembership(id, joining_date, duration_months, payment_status, total_price, amount_paid) {
    const expiry_date = calculateExpiry(joining_date, duration_months);
    const balance_amount = total_price - amount_paid;
    const [result] = await pool.query(
      `UPDATE members 
       SET joining_date=?, duration_months=?, expiry_date=?, status=?, 
           payment_status=?, total_price=?, amount_paid=?, balance_amount=? 
       WHERE id=?`,
      [joining_date, duration_months, expiry_date, "Active", payment_status, total_price, amount_paid, balance_amount, id]
    );
    return result.affectedRows;
  },

  // SPECIAL
  async getExpiringMembers(month) {
    const [rows] = await pool.query(
      "SELECT * FROM members WHERE DATE_FORMAT(expiry_date, '%Y-%m') = ?",
      [month]
    );
    return rows;
  },

  // DELETE
  async delete(id) {
    const [result] = await pool.query("DELETE FROM members WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

module.exports = Member;
