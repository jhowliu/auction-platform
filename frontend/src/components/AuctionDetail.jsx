import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import auctionService from "../services/auctionService";

export default function AuctionDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [auction, setAuction] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuction = async (id) => {
            try {
                const response = await auctionService.getAuctionById(id)
                console.log('test')
                if (response.success) {
                    setAuction(response.data);
                }
            } catch (error) {
                alert('Failed to fetch auctions.');
            }
        }

        fetchAuction(id);
    }, [id])

    const handleOnDelete = async () => {
        try {
            const response = await auctionService.deleteAuction(auction.id);
            if (response.success) {
                navigate('/');
            }
        } catch {
            alert("failed to delete this auction");
        }
    }

    const getTimeRemaining = () => {
        if (!auction || !auction.endDate) return '';
        
        const now = new Date();
        const endDate = new Date(auction.endDate);
        const diff = endDate - now;

        if (diff <= 0) return 'ENDED';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
        return `${minutes}m ${seconds}s`;
    };

    // const formatDate = (dateString) => {
    //     return new Date(dateString).toLocaleString();
    // };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-4xl grid grid-cols-2 p-16 border-2 gap-x-8 mt-16">
                {/* Image gallery */}
                <div className="mx-auto">
                    {auction.images && (
                        <img
                            alt="image1"
                            src={auction.images.length > 0 ? auction.images[0] : '/placeholder-image.jpg'}
                            className="h-auto object-contain rounded-lg shadow-xl dark:shadow-gray-800 max-lg:hidden"
                        />
                    )}
                </div>

                {/* Product info */}
                <div className="max-w-2xl px-4 pb-2">
                    <div className="flex items-center mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">{auction.title}</h1>
                    </div>
                    <div className="mt-5 flex">
                        <div className="text-lg font-bold text-orange-600">
                            {getTimeRemaining()}
                        </div>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pr-8 lg:pb-16">
                        <div className="grid gap-y-1">
                            <div>
                                <span className="text-gray-500">Category:</span>
                                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                    {auction.category}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500">Current Price: </span>
                                <span className="px-2 py-1 text-base font-bold text-green-600">
                                    ${auction.currentPrice}
                                </span>
                            </div>

                            <div className="flex">
                                <span className="text-gray-500">Starting Price:</span>
                                <div className="px-1 font-base">${auction.startingPrice}</div>
                            </div>

                            <div className="flex">
                                <span className="text-gray-500">Total Bids:</span>
                                <div className="px-1 font-base">{auction.totalBids}</div>
                            </div>
                        </div>
                    </div>
                    {
                        user && (
                            <button onClick={handleOnDelete}>DELETE</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}