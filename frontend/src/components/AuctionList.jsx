import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuctionCard from './AuctionCard';


const dummies = [{
    "_id": "test",
    title: "Basic Tee",
    images: [{
        src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg"
    }],
    "startingPrice": 100,
    "category": "Home",
    "startDate": "2025-08-09T06:32:20.220Z",
    "endDate": "2025-08-19T06:35:20.220Z",
    "status": "ended",
    "seller": {
        "_id": "689429624cd837408822c65f"
    },
    "totalBids": 0,
    "currentPrice": 10,
    "createdAt": "2025-08-09T06:32:08.492Z",
    "updatedAt": "2025-08-09T06:33:12.856Z",
},
{
  "_id": "test2",
  title: "Basic Tee2",
  images: [{
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg"
  }],
  "startingPrice": 100,
  "category": "Home",
  "startDate": "2025-08-09T06:32:20.220Z",
  "endDate": "2025-08-19T06:35:20.220Z",
  "status": "ended",
  "seller": {
      "_id": "689429624cd837408822c65f"
  },
  "totalBids": 0,
  "currentPrice": 100,
  "createdAt": "2025-08-09T06:32:08.492Z",
  "updatedAt": "2025-08-09T06:33:12.856Z",
}]

const AuctionList = () => {
  const [auctions, setAuctions] = useState(dummies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAuctions = async () => {
    setLoading(true);
    setError(null);
    try {

      // const response = await auctionService.getAuctions(params);
      setAuctions(dummies);
      
      //if (response.success) {
      //  setAuctions(response.data);
      //}
    } catch (err) {
      setError(err.message || 'Failed to fetch auctions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions()
  })

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        {error.message}, Please Try again
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {auctions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">No auctions found</div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {auctions.map((auction) => (
              <AuctionCard
                key={auction._id}
                auction={auction}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionList;