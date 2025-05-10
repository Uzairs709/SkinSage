import { useStripe } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import { forwardRef, useImperativeHandle } from "react";

async function fetchPaymentSheetParams(amount: number): Promise<{
    paymentIntent: string,
    ephemeralKey: string,
    customer: string,
}> {
    return fetch('/api/payment-sheet', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
    }).then((res) => res.json());
}

export interface CheckoutFormRef {
    handlePayment: () => Promise<boolean>;
}

const CheckoutForm = forwardRef<CheckoutFormRef, { amount: number }>(({ amount }, ref) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const handlePayment = async (): Promise<boolean> => {
        try {
            const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams(amount);
            const { error: initError } = await initPaymentSheet({
                merchantDisplayName: "merchant.com.skin-sage",
                customerEphemeralKeySecret: ephemeralKey,
                customerId: customer,
                paymentIntentClientSecret: paymentIntent,
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    email: "test@test.com",
                    name: "Test User",
                    phone: "+1234567890",
                },
                returnURL: Linking.createURL("stripe-redirect"),
            });

            if (initError) {
                console.log("Payment sheet initialization error", initError);
                return false;
            }

            const { error: presentError } = await presentPaymentSheet();
            
            // Handle payment sheet dismissal
            if (presentError?.code === 'Canceled') {
                console.log("Payment sheet was dismissed");
                return false;
            }
            
            if (presentError) {
                console.log("Payment sheet presentation error", presentError);
                return false;
            }

            return true;
        } catch (error) {
            console.error("Payment error:", error);
            return false;
        }
    };

    useImperativeHandle(ref, () => ({
        handlePayment
    }));

    return null;
});

export default CheckoutForm;