"use client";
import Footer from "@/src/app/component/footer/footer";
import Navbar from "@/src/app/component/navbar/nav";
import { apiCall } from "../../../../utils/ApiCall";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import { CircleArrowLeft } from "lucide-react";
import Modal from "@/src/app/component/ProductModel";
import Invoice from "../../../../component/Invoice"

const STATUS_ENUM = [
    "order_placed",
    "order_confirmed",
    "processing",
    "shipped",
    "in_transit",
    "out_for_delivery",
    "delivered",
];


const Page = () => {
    const navigate = useRouter()
    const [modalOpen, setModalOpen] = useState(false)
    const [purchaseData, setPurchaseData] = useState(null);
    const [nextStatus, setNextStatus] = useState("");
    const { id } = useParams();

    const handleresponse = async () => {
        try {
            const response = await apiCall(`/admin/private/purchaseById/${id}`, "get");
            setPurchaseData(response?.data?.[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleresponse();
    }, []);

    const getNextStatus = (currentStatus) => {
        switch (currentStatus) {
            case "order_placed":
                return "order_confirmed";
            case "order_confirmed":
                return "processing";
            case "processing":
                return "shipped";
            case "shipped":
                return "in_transit";
            case "in_transit":
                return "out_for_delivery";
            case "out_for_delivery":
                return "delivered";
            default:
                return "";
        }
    };
    const  handleChangeStatus = async () => {
        try {
            let formData={
                status:getNextStatus(purchaseData?.orderStatus)
            }
            console.log(formData)
            await apiCall(`/admin/private/changeProductStatus/${purchaseData?._id}`, "patch",formData);
            setModalOpen(false)
            handleresponse()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {/* <Navbar /> */}
            <section className="p-6 text-black main-bg  min-h-screen bg-gray-50">
                <div className="flex items-center">
                    <CircleArrowLeft size={32} onClick={() => navigate.back()} />
                    <h2 className="text-3xl ms-3 font-bold mb-6 mt-6">Purchase Details</h2>
                </div>
                <div className="pb-5">
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-5xl space-y-6">
                        {/* Order Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p><strong>Order ID:</strong> #{purchaseData?.orderId}</p>
                                <p><strong>Order Date:</strong> {moment(purchaseData?.createdAt).format("MMMM Do YYYY, h:mm A")}</p>
                                <p><strong>Payment Type:</strong> {purchaseData?.paymentType.toUpperCase()}</p>
                                <p><strong>Payment Status:</strong> <span className="capitalize">{purchaseData?.paymentStatus}</span></p>
                                <p><strong>Order Status:</strong> <span className="capitalize">{purchaseData?.orderStatus}</span></p>
                            </div>
                            <div>
                                <p><strong>Shipping Address:</strong></p>
                                <p>{purchaseData?.shippingAddress?.address}</p>
                                <p>{purchaseData?.shippingAddress?.city}, {purchaseData?.shippingAddress?.state} - {purchaseData?.shippingAddress?.zip}</p>
                                <p>{purchaseData?.shippingAddress?.country}</p>
                            </div>
                        </div>

                        {/* Products */}
                        <div>


                            <div className="space-y-4">
                                {purchaseData?.products?.map((product, index) => (
                                    <div key={product?._id} className="flex items-center gap-4 border p-4 rounded-lg bg-gray-50">
                                        <img
                                            src={`https://brajkunjseva.com/api/assets/get-asset?path=${encodeURIComponent(
                                                product?.productImage
                                            )}`}
                                            alt="Product"
                                            className="w-20 h-20 object-cover rounded border"
                                        />
                                        <div className="flex-1">
                                            <p><strong>Product Name:</strong> {product?.productName}</p>
                                            <p><strong>Product ID:</strong> {product?.productId}</p>
                                            <p><strong>Quantity:</strong> {product?.quantity}</p>
                                            <p><strong>Price:</strong> ₹{product?.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Payment Summary */}
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Payment Summary</h3>
                            <div className="grid grid-cols-2 max-w-md gap-2">
                                <p>Subtotal:</p><p>₹{purchaseData?.paymentSummary?.Subtotal}</p>
                                <p>Shipping:</p><p>₹{purchaseData?.paymentSummary?.Shipping}</p>
                                <p>Discount:</p><p>- ₹{purchaseData?.paymentSummary?.Discount}</p>
                                <p className="font-bold">Total:</p><p className="font-bold">₹{purchaseData?.paymentSummary?.total}</p>
                            </div>
                        </div>

                        {/* Order Timeline */}
                        <div>
                            <div className="flex justify-between">
                                <h3 className="text-xl font-semibold mb-3">Order Timeline</h3>
                                <div className="flex items-center justify-between mb-2">
                                    {["order_placed", "order_confirmed", "processing", "shipped", "in_transit", "out_for_delivery"].includes(purchaseData?.orderStatus) && (
                                        <button
                                            className="px-5 py-2 rounded bg-red-500 text-white"
                                            onClick={() => setModalOpen(true)}
                                        >
                                            {
                                                purchaseData?.orderStatus === "order_placed" ? "Mark as Order Confirmed" :
                                                    purchaseData?.orderStatus === "order_confirmed" ? "Mark as Processing" :
                                                        purchaseData?.orderStatus === "processing" ? "Mark as Shipped" :
                                                            purchaseData?.orderStatus === "shipped" ? "Mark as In Transit" :
                                                                purchaseData?.orderStatus === "in_transit" ? "Mark as Out for Delivery" :
                                                                    purchaseData?.orderStatus === "out_for_delivery" ? "Mark as Delivered" :
                                                                        ""
                                            }
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                {purchaseData?.orderStatus != "cancelled" ? STATUS_ENUM.map((status) => {
                                    const time = purchaseData?.statusTimestamps[status];
                                    return (
                                        <div key={status} className="flex items-center gap-4">
                                            <div className={`w-3 h-3 rounded-full ${time ? "bg-green-500" : "bg-gray-300"}`}></div>
                                            <p className="capitalize w-48">{status.replaceAll("_", " ")}</p>
                                            <p className="text-sm text-gray-500">
                                                {time ? moment(time)?.format("MMMM Do YYYY, h:mm A") : "Not updated"}
                                            </p>
                                        </div>
                                    );
                                }) : (
                                    <>
                                        <div className="flex w-full items-center gap-4">
                                            <div className={`w-3 h-3 rounded-full bg-green-500`}></div>
                                            <p>Order Placed</p>
                                            <p className="text-sm text-gray-500">
                                                {moment(purchaseData?.statusTimestamps?.order_placed)?.format("MMMM Do YYYY, h:mm A")}
                                            </p>
                                        </div>
                                        <div className="flex w-full items-center gap-4">
                                            <div className={`w-3 h-3 rounded-full bg-green-500`}></div>
                                            <p>Cancelled</p>
                                            <p className="text-sm text-gray-500">
                                                {moment(purchaseData?.updateAt)?.format("MMMM Do YYYY, h:mm A")}
                                            </p>
                                        </div>

                                    </>

                                )}
                            </div>
                            <div>
                                <Invoice order={purchaseData} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="p-6 bg-white rounded-lg max-w-sm mx-auto text-center">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Mark as <span className="capitalize text-purple-600">{getNextStatus(purchaseData?.orderStatus).replace(/_/g, " ")}</span>?</h3>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => handleChangeStatus()}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                        >
                            No
                        </button>
                    </div>
                </div>
            </Modal>


            <Footer />
        </>
    );
};

export default Page;
