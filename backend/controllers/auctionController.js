const Auction = require('../models/Auction');


const getAuctions = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      status = 'active',
      sortBy = 'endDate',
      order = 'asc',
      search
    } = req.query;

    const filter = { status };
    if (category && category !== 'all') filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOptions = { [sortBy]: sortOrder };

    const auctions = await Auction.find(filter)
      .populate('seller', 'username')
      .populate('winner', 'username')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Auction.countDocuments(filter);

    res.json({
      success: true,
      data: auctions,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// auctions/:id
// auction item details 
const getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate('seller', 'username email')
      .populate('winner', 'username');

    if (!auction) {
      return res.status(404).json({
        success: false,
        error: 'Auction not found'
      });
    }

    res.json({
      success: true,
      data: auction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


module.exports = {
  getAuctions,
  getAuctionById,
};