import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  PRODUCT_ENDPOINTS,
  BID_ENDPOINTS,
  SSE_ENDPOINTS,
  AuthToken,
  AuthUser,
} from "../config/api";
import {
  Package,
  Plus,
  Gavel,
  TrendingUp,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowLeft,
  Send,
  Tag,
  List,
  LayoutGrid,
} from "lucide-react";

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productIdParam = searchParams.get("product");

  const [tab, setTab] = useState(productIdParam ? "browse" : "browse");
  const [isLoggedIn] = useState(AuthToken.exists());
  const [currentUser] = useState(AuthUser.get());

  // Product listing form state
  const [listForm, setListForm] = useState({
    title: "",
    description: "",
    category: "General",
    base_price: "",
    bid_end_time: "",
    status: "active",
  });
  const [listLoading, setListLoading] = useState(false);
  const [listSuccess, setListSuccess] = useState(false);
  const [listError, setListError] = useState("");

  // Browse state
  const [products, setProducts] = useState([]);
  const [browseLoading, setBrowseLoading] = useState(true);
  const [browsePage, setBrowsePage] = useState(1);
  const [browseTotal, setBrowseTotal] = useState(0);
  const [browseLastPage, setBrowseLastPage] = useState(1);

  // Product detail + bidding state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [bidHistory, setBidHistory] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [bidLoading, setBidLoading] = useState(false);
  const [bidError, setBidError] = useState("");
  const [bidSuccess, setBidSuccess] = useState("");

  // My bids state
  const [myBids, setMyBids] = useState([]);
  const [myBidsLoading, setMyBidsLoading] = useState(false);

  // SSE ref
  const sseRef = useRef(null);

  // ─── Fetch products for browsing ───────────────────────────
  const fetchProducts = useCallback(async (page = 1) => {
    setBrowseLoading(true);
    try {
      const response = await axios.get(PRODUCT_ENDPOINTS.LIST, {
        params: { page, per_page: 9, status: "active", sort_by: "created_at", sort_dir: "DESC" },
      });
      if (response.data.success) {
        setProducts(response.data.data || []);
        setBrowseTotal(response.data.pagination?.total || 0);
        setBrowseLastPage(response.data.pagination?.last_page || 1);
        setBrowsePage(page);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setBrowseLoading(false);
    }
  }, []);

  // ─── Fetch single product detail ──────────────────────────
  const fetchProductDetail = useCallback(async (id) => {
    setDetailLoading(true);
    setBidHistory([]);
    setBidError("");
    setBidSuccess("");
    try {
      const [productRes, bidsRes] = await Promise.all([
        axios.get(PRODUCT_ENDPOINTS.DETAIL(id)),
        axios.get(BID_ENDPOINTS.HISTORY(id), { params: { per_page: 20 } }),
      ]);

      if (productRes.data.success) {
        setSelectedProduct(productRes.data.data);
      }
      if (bidsRes.data.success) {
        setBidHistory(bidsRes.data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch product:", err);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  // ─── Fetch my bids ────────────────────────────────────────
  const fetchMyBids = useCallback(async () => {
    if (!isLoggedIn) return;
    setMyBidsLoading(true);
    try {
      const response = await axios.get(BID_ENDPOINTS.MY_BIDS, {
        headers: AuthToken.getHeader(),
        params: { per_page: 50 },
      });
      if (response.data.success) {
        setMyBids(response.data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch my bids:", err);
    } finally {
      setMyBidsLoading(false);
    }
  }, [isLoggedIn]);

  // ─── SSE for live bid updates ─────────────────────────────
  useEffect(() => {
    if (selectedProduct?.id && selectedProduct?.bid_end_time) {
      const eventSource = new EventSource(SSE_ENDPOINTS.BID_STREAM(selectedProduct.id));
      sseRef.current = eventSource;

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "new_bid") {
            // Update product price
            setSelectedProduct((prev) =>
              prev ? { ...prev, current_price: data.amount, total_bids: data.total_bids } : prev
            );
            // Prepend new bid to history
            setBidHistory((prev) => [
              {
                amount: data.amount,
                bidder_name: data.bidder_name,
                created_at: data.timestamp,
              },
              ...prev,
            ]);
          }
        } catch (e) {
          // Non-JSON SSE data, ignore
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
      };

      return () => {
        eventSource.close();
        sseRef.current = null;
      };
    }
  }, [selectedProduct?.id, selectedProduct?.bid_end_time]);

  // ─── On mount: fetch browse products ──────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts(1);
  }, [fetchProducts]);

  // ─── Handle product param from URL ────────────────────────
  useEffect(() => {
    if (productIdParam) {
      fetchProductDetail(productIdParam);
    }
  }, [productIdParam, fetchProductDetail]);

  // ─── Handle tab changes ───────────────────────────────────
  useEffect(() => {
    if (tab === "browse") fetchProducts(1);
    if (tab === "mybids") fetchMyBids();
  }, [tab, fetchProducts, fetchMyBids]);

  // ─── Create product listing ───────────────────────────────
  const handleCreateListing = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setListError("Please login to list products");
      return;
    }
    setListLoading(true);
    setListError("");
    setListSuccess(false);

    try {
      const response = await axios.post(PRODUCT_ENDPOINTS.CREATE, listForm, {
        headers: { ...AuthToken.getHeader(), "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setListSuccess(true);
        setListForm({ title: "", description: "", category: "General", base_price: "", bid_end_time: "", status: "active" });
        setTimeout(() => setListSuccess(false), 4000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create listing";
      setListError(msg);
    } finally {
      setListLoading(false);
    }
  };

  // ─── Place a bid ──────────────────────────────────────────
  const handlePlaceBid = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setBidError("Please login to place bids");
      return;
    }
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      setBidError("Enter a valid bid amount");
      return;
    }

    setBidLoading(true);
    setBidError("");
    setBidSuccess("");

    try {
      const response = await axios.post(
        BID_ENDPOINTS.PLACE(selectedProduct.id),
        { amount: parseFloat(bidAmount) },
        { headers: { ...AuthToken.getHeader(), "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setBidSuccess("Bid placed successfully! 🎉");
        setBidAmount("");
        // Refresh product detail
        fetchProductDetail(selectedProduct.id);
        setTimeout(() => setBidSuccess(""), 4000);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to place bid";
      setBidError(msg);
    } finally {
      setBidLoading(false);
    }
  };

  // ─── Format helpers ───────────────────────────────────────
  const formatPrice = (p) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p || 0);

  const timeLeft = (endTime) => {
    if (!endTime) return null;
    const diff = new Date(endTime) - new Date();
    if (diff <= 0) return "Ended";
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${mins}m left`;
    return `${mins}m left`;
  };

  const formatDate = (d) => {
    if (!d) return "";
    return new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  };

  // ─── Min bid date for form ────────────────────────────────
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    return now.toISOString().slice(0, 16);
  };

  // ═════════════════════════════════════════════════════════
  // RENDER: Product Detail View
  // ═════════════════════════════════════════════════════════
  if (selectedProduct || detailLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => {
              setSelectedProduct(null);
              navigate("/Marketplace");
            }}
            className="flex items-center text-green-700 hover:text-green-900 mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Marketplace
          </button>

          {detailLoading ? (
            <div className="flex justify-center items-center py-32">
              <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
            </div>
          ) : selectedProduct ? (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Product Header */}
              <div className="bg-[#334b35] p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs mb-3 inline-block">
                      {selectedProduct.category}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold">{selectedProduct.title}</h1>
                    <p className="text-green-200 mt-2 text-sm">
                      Listed by User #{selectedProduct.user_id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-200 text-xs uppercase tracking-wider">Current Price</p>
                    <p className="text-3xl font-black text-[#f7c35f]">
                      {formatPrice(selectedProduct.current_price || selectedProduct.base_price)}
                    </p>
                    {selectedProduct.bid_end_time && (
                      <div className="mt-2 flex items-center justify-end text-sm">
                        <Clock size={14} className="mr-1" />
                        <span className={timeLeft(selectedProduct.bid_end_time) === "Ended" ? "text-red-300" : "text-green-200"}>
                          {timeLeft(selectedProduct.bid_end_time)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Description */}
                {selectedProduct.description && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>
                )}

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <p className="text-xs text-gray-500">Base Price</p>
                    <p className="text-lg font-bold text-green-800">{formatPrice(selectedProduct.base_price)}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-xl text-center">
                    <p className="text-xs text-gray-500">Total Bids</p>
                    <p className="text-lg font-bold text-yellow-700">{selectedProduct.total_bids || 0}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-lg font-bold text-blue-700 capitalize">{selectedProduct.status}</p>
                  </div>
                </div>

                {/* Place Bid Form */}
                {selectedProduct.bid_end_time && 
                 selectedProduct.status === "active" && 
                 timeLeft(selectedProduct.bid_end_time) !== "Ended" && (
                  <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-6 rounded-xl mb-8 border border-green-200">
                    <h3 className="font-bold text-green-800 text-lg mb-4 flex items-center">
                      <Gavel size={20} className="mr-2" />
                      Place Your Bid
                    </h3>

                    {!isLoggedIn ? (
                      <div className="text-center py-4">
                        <p className="text-gray-600 mb-3">Login to place bids</p>
                        <Link
                          to="/LoginPage"
                          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 transition-all no-underline"
                        >
                          Login
                        </Link>
                      </div>
                    ) : (
                      <form onSubmit={handlePlaceBid} className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-grow relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                          <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => {
                              setBidAmount(e.target.value);
                              setBidError("");
                            }}
                            placeholder={`Min: ${formatPrice(
                              Math.max(
                                parseFloat(selectedProduct.current_price || 0),
                                parseFloat(selectedProduct.base_price || 0)
                              ) + 1
                            )}`}
                            min={
                              Math.max(
                                parseFloat(selectedProduct.current_price || 0),
                                parseFloat(selectedProduct.base_price || 0)
                              ) + 1
                            }
                            step="0.01"
                            className="w-full pl-10 pr-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 text-lg"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={bidLoading}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center whitespace-nowrap"
                        >
                          {bidLoading ? (
                            <Loader2 size={20} className="animate-spin" />
                          ) : (
                            <>
                              <Send size={18} className="mr-2" />
                              Place Bid
                            </>
                          )}
                        </button>
                      </form>
                    )}

                    {bidError && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
                        <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                        {bidError}
                      </div>
                    )}
                    {bidSuccess && (
                      <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center text-green-700 text-sm">
                        <CheckCircle size={16} className="mr-2 flex-shrink-0" />
                        {bidSuccess}
                      </div>
                    )}
                  </div>
                )}

                {/* Bid History */}
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
                    <TrendingUp size={20} className="mr-2" />
                    Bid History ({bidHistory.length})
                  </h3>

                  {bidHistory.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <Gavel size={32} className="mx-auto mb-2 opacity-50" />
                      <p>No bids yet. Be the first!</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {bidHistory.map((bid, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            idx === 0 ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center mr-3">
                              <User size={16} className="text-green-700" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {bid.bidder_name || bid.user_name || `User #${bid.user_id}`}
                              </p>
                              <p className="text-xs text-gray-400">{formatDate(bid.created_at)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${idx === 0 ? "text-yellow-700 text-lg" : "text-gray-700"}`}>
                              {formatPrice(bid.amount)}
                            </p>
                            {idx === 0 && (
                              <span className="text-xs text-yellow-600 font-medium">🏆 Highest</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════
  // RENDER: Main Marketplace View (Tabs)
  // ═════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-[#334b35] rounded-2xl p-6 text-white mb-6 shadow-xl">
          <h1 className="text-3xl font-bold flex items-center">
            <span className="text-[#f7c35f] mr-3">🌾</span>
            FarmBazaar Marketplace
          </h1>
          <p className="text-green-200 mt-2">Buy, sell, and bid on fresh produce directly from farmers</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          {[
            { id: "browse", icon: <LayoutGrid size={18} />, label: "Browse" },
            { id: "list", icon: <Plus size={18} />, label: "List Product" },
            { id: "mybids", icon: <Gavel size={18} />, label: "My Bids" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                if (t.id === "list" && !isLoggedIn) {
                  navigate("/LoginPage");
                }
                if (t.id === "mybids" && !isLoggedIn) {
                  navigate("/LoginPage");
                }
              }}
              className={`flex-1 py-4 font-medium text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                tab === t.id
                  ? "text-green-700 border-b-3 border-[#f7c35f] bg-green-50"
                  : "text-gray-500 hover:text-green-600 hover:bg-gray-50"
              }`}
              style={tab === t.id ? { borderBottom: "3px solid #f7c35f" } : {}}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* ─── Browse Tab ─────────────────────────────────── */}
        {tab === "browse" && (
          <div>
            {browseLoading ? (
              <div className="flex justify-center items-center py-32">
                <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-32">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-xl font-medium">No products listed yet</p>
                <p className="text-gray-400 mt-2">Be the first to list a product!</p>
                {isLoggedIn && (
                  <button
                    onClick={() => setTab("list")}
                    className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 transition-all"
                  >
                    <Plus size={18} className="inline mr-1" /> List Now
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => fetchProductDetail(product.id)}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-100"
                    >
                      {/* Image / Placeholder */}
                      <div className="h-44 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center relative overflow-hidden">
                        {product.images && JSON.parse(product.images || "[]").length > 0 ? (
                          <img
                            src={`http://localhost/farmbazaar-api/${JSON.parse(product.images)[0]}`}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <span className="text-5xl group-hover:scale-110 transition-transform duration-300">🌾</span>
                        )}

                        {/* Bid Status Badge */}
                        {product.bid_end_time && (
                          <div
                            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                              timeLeft(product.bid_end_time) === "Ended"
                                ? "bg-gray-500 text-white"
                                : "bg-red-500 text-white animate-pulse"
                            }`}
                          >
                            {timeLeft(product.bid_end_time) === "Ended" ? "Ended" : "🔴 Live"}
                          </div>
                        )}

                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-green-800">
                          {product.category}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 text-lg truncate group-hover:text-green-700 transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                          {product.description || "Farm produce available for bidding"}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-xl font-black text-green-800">
                            {formatPrice(product.current_price || product.base_price)}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center">
                            <Gavel size={12} className="mr-1" />
                            {product.total_bids || 0} bids
                          </span>
                        </div>
                        {product.bid_end_time && timeLeft(product.bid_end_time) !== "Ended" && (
                          <div className="mt-3 flex items-center text-xs text-orange-600">
                            <Clock size={12} className="mr-1" />
                            {timeLeft(product.bid_end_time)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {browseLastPage > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    {Array.from({ length: browseLastPage }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => fetchProducts(p)}
                        className={`w-10 h-10 rounded-full font-medium transition-all ${
                          p === browsePage
                            ? "bg-green-600 text-white"
                            : "bg-white text-gray-600 hover:bg-green-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ─── List Product Tab ───────────────────────────── */}
        {tab === "list" && isLoggedIn && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <Tag size={24} className="mr-3" />
                List a New Product
              </h2>

              {listSuccess && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl flex items-center text-green-700">
                  <CheckCircle size={20} className="mr-3" />
                  <div>
                    <p className="font-bold">Product listed successfully! 🎉</p>
                    <p className="text-sm">Your product is now live on the marketplace.</p>
                  </div>
                </div>
              )}

              {listError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-700">
                  <AlertCircle size={20} className="mr-3" />
                  {listError}
                </div>
              )}

              <form onSubmit={handleCreateListing} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    value={listForm.title}
                    onChange={(e) => setListForm({ ...listForm, title: e.target.value })}
                    placeholder="e.g., Fresh Organic Tomatoes"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                    required
                    minLength={3}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={listForm.description}
                    onChange={(e) => setListForm({ ...listForm, description: e.target.value })}
                    placeholder="Describe your product — quality, quantity, origin, etc."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all h-28 resize-none"
                  />
                </div>

                {/* Category + Price Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={listForm.category}
                      onChange={(e) => setListForm({ ...listForm, category: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white"
                    >
                      <option>General</option>
                      <option>Seeds</option>
                      <option>Vegetables</option>
                      <option>Fruits</option>
                      <option>Grains</option>
                      <option>Fertilizers</option>
                      <option>Equipment</option>
                      <option>Pesticides</option>
                      <option>Dairy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹) *</label>
                    <input
                      type="number"
                      value={listForm.base_price}
                      onChange={(e) => setListForm({ ...listForm, base_price: e.target.value })}
                      placeholder="500"
                      min="1"
                      step="0.01"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Bid End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bid End Time <span className="text-gray-400">(leave empty for fixed price)</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={listForm.bid_end_time}
                    onChange={(e) => setListForm({ ...listForm, bid_end_time: e.target.value })}
                    min={getMinDateTime()}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Set a future date to enable bidding. Otherwise product will be fixed-price.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={listLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                >
                  {listLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <Plus size={20} className="mr-2" />
                      List Product
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ─── My Bids Tab ────────────────────────────────── */}
        {tab === "mybids" && isLoggedIn && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-green-800 flex items-center">
                  <List size={24} className="mr-3" />
                  My Bids
                </h2>
              </div>

              {myBidsLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                </div>
              ) : myBids.length === 0 ? (
                <div className="text-center py-20">
                  <Gavel size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 text-lg">No bids placed yet</p>
                  <p className="text-gray-400 text-sm mt-1">Browse products and start bidding!</p>
                  <button
                    onClick={() => setTab("browse")}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 transition-all"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {myBids.map((bid) => (
                    <div
                      key={bid.id}
                      onClick={() => bid.product_id && fetchProductDetail(bid.product_id)}
                      className="p-4 hover:bg-green-50 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {bid.product_title || `Product #${bid.product_id}`}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(bid.created_at)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-700 text-lg">{formatPrice(bid.amount)}</p>
                        {bid.is_winning ? (
                          <span className="text-xs text-yellow-600 font-medium">🏆 Winning</span>
                        ) : (
                          <span className="text-xs text-gray-400">Outbid</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;