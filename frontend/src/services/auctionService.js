import axiosInstance from '../axiosConfig';

const USER_API_BASE = '/api/users/auctions';
const API_BASE = '/api/auctions';

const auctionService = {
  // Auction CRUD operations
  createAuction: async (auctionData) => {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post(USER_API_BASE, auctionData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getUserAuctions: async (params = {}) => {
    const token = localStorage.getItem('token');
    const queryString = new URLSearchParams(params).toString();
    const response = await axiosInstance.get(`${USER_API_BASE}?${queryString}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAuctions: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await axiosInstance.get(`${API_BASE}?${queryString}`);
    return response.data;
  },

  getAuctionById: async (id) => {
    const response = await axiosInstance.get(`${API_BASE}/${id}`);
    return response.data;
  },

  updateAuction: async (id, updateData) => {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.put(`${USER_API_BASE}/${id}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  deleteAuction: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.delete(`${USER_API_BASE}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
};

export { auctionService };
export default auctionService;