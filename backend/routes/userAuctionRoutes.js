const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { validateAuctionData } = require('../middleware/validation');
const {
  createAuction,
  updateAuction,
  getUserAunctions,
  deleteAuction,
} = require('../controllers/userAuctionController')

router.get('/', protect, getUserAunctions);
router.post('/', protect, validateAuctionData, createAuction);
router.put('/:id', protect, updateAuction);
router.delete('/:id', protect, deleteAuction);

module.exports = router;