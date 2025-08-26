const express = require("express");
const router = express.Router();
const {
  getMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

// ✅ Fetch all members
router.get("/", getMembers);

// ✅ Fetch single member by ID
router.get("/:id", getMemberById);

// ✅ Add new member
router.post("/", addMember);

// ✅ Update member by ID
router.put("/:id", updateMember);

// ✅ Delete member by ID
router.delete("/:id", deleteMember);

module.exports = router;
