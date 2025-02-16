import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as motion from "motion/react-client";
import {paymentOnline} from '../Apis/payment'


export default function Payment({cartId}) {
    let { mutate, data } = useMutation({ mutationFn: paymentOnline });

    function handlePayment(shippingAddress) {
        mutate({ cartId, shippingAddress });
    }

    // console.log(data);

    if (data?.data?.status === "success") {
        window.location.href = data?.data?.session?.url;
    }

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit: handlePayment,
    });

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="w-full max-w-2xl mx-auto p-4 overflow-x-hidden"
            style={{ boxSizing: "border-box" }}
        >
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-color">
                    Payment
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="details"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Details
                        </label>
                        <input
                            type="text"
                            id="details"
                            name="details"
                            value={formik.values.details}
                            onChange={formik.handleChange}
                            placeholder="Enter your details"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-color focus:border-green-color"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            placeholder="Enter your phone number"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-color focus:border-green-color"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                        >
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            placeholder="Enter your city"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-color focus:border-green-color"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-color hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Pay
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
