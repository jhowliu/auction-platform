const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { validateAuctionData } = require('../middleware/validation');
const {
  createAuction,
  updateAuction,
  getAuctionById,
  getUserAunctions,
  deleteAuction,
} = require('../controllers/userAuctionController')

router.get('/', protect, getUserAunctions);
router.get('/:id', protect, getAuctionById);
router.post('/', protect, validateAuctionData, createAuction);
router.put('/:id', protect, updateAuction);
router.delete('/:id', protect, deleteAuction);

module.exports = router;