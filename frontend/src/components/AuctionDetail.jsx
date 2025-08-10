import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import auctionService from "../services/auctionService";

export default function AuctionDetail({ auction: propAuction }) {
    const Ref = useRef(null);
    const { id } = useParams();
    const [auction, setAuction] = useState(propAuction||{})
    const [timer, setTimer] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const startTimer = (e) => {
        setTimer(getTimeRemaining());
    }

    const clearTimer = (e) => {
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    useEffect(() => {
        clearTimer()
    })

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await auctionService.getAuctionById(id);
                if (response.success) {
                    setAuction(response.data);
                }
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to fetch auction');
            } finally {
                setLoading(false);
            }
        };

        if (!propAuction && id) {
            fetchAuction();
        }
    }, [id, propAuction]);


    const getAuctionStatus = (auction) => {
        if (!auction || !auction.startDate || !auction.endDate) return 'Unknown';
        
        const now = new Date();
        const startDate = new Date(auction.startDate);
        const endDate = new Date(auction.endDate);
        
        if (now < startDate) return 'Upcoming';
        if (now > endDate) return 'Ended';
        return 'Active';
    };

    const getTimeRemaining = () => {
        if (!auction || !auction.endDate) return '';
        
        const now = new Date();
        const endDate = new Date(auction.endDate);
        const diff = endDate - now;

        if (diff <= 0) return '';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
        return `${minutes}m ${seconds}s`;
    };
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center py-16">
                            <div className="text-red-600 mb-4">
                                <h3 className="text-lg font-medium">Error Loading Auction</h3>
                                <p className="text-sm mt-2">{error}</p>
                            </div>
                            <Link
                                to="/auctions"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Back to Auctions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const status = getAuctionStatus(auction);

    return (
        <div className="min-h-screen bg-gray-50 pt-16 pb-10">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image gallery */}
                        <div className="">
                            {auction.images && auction.images.length > 0 ? (
                                <img
                                    alt={auction.title}
                                    src={auction.images[0]}
                                    className="w-full h-auto object-contain rounded-lg shadow-lg"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">No image available</span>
                                </div>
                            )}
                        </div>

                        {/* Auction info */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <h1 className="text-4xl font-thin text-gray-800">{auction.title}</h1>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        status === 'Active' ? 'bg-green-100 text-green-800' :
                                        status === 'Ended' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {status}
                                    </span>
                                </div>
                                <div className="text-lg font-light text-orange-600">{timer}</div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-light text-gray-800 mb-2">Description</h3>
                                    <p className="text-gray-600 font-thin">{auction.description || 'No description available'}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-light text-gray-800">Starting Price</h4>
                                        <p className="text-lg font-thin text-green-600">${auction.startingPrice}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-light text-gray-800">Current Bids</h4>
                                        <p className="text-lg font-thin text-blue-600">{auction.totalBids || 0}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm font-light text-gray-500">
                                        <strong>Start:</strong> {new Date(auction.startDate).toLocaleString()}
                                    </div>
                                    <div className="text-sm font-light text-gray-500">
                                        <strong>End:</strong> {new Date(auction.endDate).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}