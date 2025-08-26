const Member = require("../models/memberModel");

// Helper function to calculate membership status
function calculateMembershipStatus(joiningDate, durationMonths) {
  const joinDate = new Date(joiningDate);
  const expiryDate = new Date(joinDate);
  expiryDate.setMonth(expiryDate.getMonth() + durationMonths);
  
  const today = new Date();
  const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry > 30) return 'Active';
  if (daysUntilExpiry > 0) return 'Expiring';
  return 'Expired';
}

// ✅ Get all members with calculated status
const getMembers = async (req, res) => {
  try {
    const members = await Member.findAll();
    
    // Calculate status and balance for each member
    const membersWithStatus = members.map(member => ({
      ...member,
      membership_status: calculateMembershipStatus(member.joining_date, member.duration_months),
      balance_amount: member.total_price - member.amount_paid
    }));
    
    res.json({
      success: true,
      data: membersWithStatus,
      count: membersWithStatus.length
    });
  } catch (err) {
    console.error("❌ Error fetching members:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch members", 
      error: err.message 
    });
  }
};

// ✅ Get member by ID
const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ 
        success: false, 
        message: "Member not found" 
      });
    }

    // Calculate status and balance
    const memberWithStatus = {
      ...member,
      membership_status: calculateMembershipStatus(member.joining_date, member.duration_months),
      balance_amount: member.total_price - member.amount_paid
    };
    
    res.json({
      success: true,
      data: memberWithStatus
    });
  } catch (err) {
    console.error("❌ Error fetching member:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch member", 
      error: err.message 
    });
  }
};

// ✅ Add new member
const addMember = async (req, res) => {
  try {
    const {
      name, age, gender, phone, email, weight, membership_plan,
      joining_date, duration_months, total_price, amount_paid, payment_status
    } = req.body;

    // Validation
    if (!name || !age || !membership_plan || !joining_date || !duration_months || !total_price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, age, membership_plan, joining_date, duration_months, total_price"
      });
    }

    const memberData = {
      name, age, gender: gender || 'Other', phone, email, weight,
      membership_plan, joining_date, duration_months, total_price,
      amount_paid: amount_paid || 0,
      payment_status: payment_status || 'Pending'
    };

    const newMember = await Member.create(memberData);
    
    res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: newMember
    });
  } catch (err) {
    console.error("❌ Error adding member:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to add member", 
      error: err.message 
    });
  }
};

// ✅ Update member
const updateMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    const updateData = req.body;

    // Check if member exists
    const existingMember = await Member.findById(memberId);
    if (!existingMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    const affectedRows = await Member.update(memberId, updateData);
    
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Member not found or no changes made"
      });
    }

    // Fetch updated member
    const updatedMember = await Member.findById(memberId);
    
    res.json({
      success: true,
      message: "Member updated successfully",
      data: updatedMember
    });
  } catch (err) {
    console.error("❌ Error updating member:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update member", 
      error: err.message 
    });
  }
};

// ✅ Delete member
const deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    
    // Check if member exists
    const existingMember = await Member.findById(memberId);
    if (!existingMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    const affectedRows = await Member.delete(memberId);
    
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    res.json({
      success: true,
      message: "Member deleted successfully"
    });
  } catch (err) {
    console.error("❌ Error deleting member:", err.message);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete member", 
      error: err.message 
    });
  }
};

module.exports = {
  getMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};