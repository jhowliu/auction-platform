const Auction = require('../models/Auction');

// POST auctions
// create auction items
const createAuction = async (req, res) => {
  try {
    const { title, description, startingPrice, category, startDate, endDate, images } = req.body;
    
    const newAuction = new Auction({
      title,
      description,
      startingPrice,
      category,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      images: images || [],
      seller: req.user.id
    });

    const savedAuction = await newAuction.save();
    const populatedAuction = await Auction.findById(savedAuction._id)
      .populate('seller', 'username email');
    
    res.status(201).json({
      success: true,
      data: populatedAuction,
      message: 'Auction created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// users/aunctions
// listing all aunction items that user created
const getUserAunctions = async (req, res) => {
  try {
    const auctions = await Auction.find({seller: req.user.id}).populate('seller', 'username')
    res.json({
        success: true,
        data: auctions,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  } 
}

const updateAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({
        success: false,
        error: 'Auction not found'
      });
    }

    if (auction.seller.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this auction'
      });
    }

    if (auction.totalBids > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot update auction with existing bids'
      });
    }

    const allowedUpdates = ['title', 'description', 'images', 'endDate'];
    const updates = {};
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedAuction = await Auction.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('seller', 'username email');

    res.json({
      success: true,
      data: updatedAuction,
      message: 'Auction updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

const deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({
        success: false,
        error: 'Auction not found'
      });
    }

    if (auction.seller.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this auction'
      });
    }

    if (auction.totalBids > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete auction with existing bids'
      });
    }

    await Auction.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Auction deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  createAuction,
  getUserAunctions,
  updateAuction,
  deleteAuction
};