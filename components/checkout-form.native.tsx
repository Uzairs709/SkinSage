import { useStripe } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import PrimaryButton from "./PrimaryButton";

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


export default function CheckoutForm({ amount }: { amount: number }) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const initialPaymentSheet = async () => {
        const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams(amount);
        const { error } = await initPaymentSheet({
            merchantDisplayName: "merchant.com.skin-sage",
            customerEphemeralKeySecret: ephemeralKey,
            customerId: customer,
            paymentIntentClientSecret: paymentIntent,

            allowsDelayedPaymentMethods: true,
            //user can enter these too will decide later
            defaultBillingDetails: {
                email: "test@test.com",
                name: "Test User",
                phone: "+1234567890",
            },
            returnURL: Linking.createURL("stripe-redirect"),
        })
        if (!error) {
            console.log("Payment sheet initialized");
            setLoading(true);
        } else {
            console.log("Payment sheet initialization error", error);
            setLoading(false);
        }
    }
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        if (error) {
            console.log("Payment sheet presentation error", error);
            setLoading(false);
        } else {
            Alert.alert("Payment successful", "Payment successful");
            setLoading(false);
        }
    }

    return (
        <>
            <PrimaryButton
                label={loading ? "Processing..." : "Pay"}
                onPress={async () => { await initialPaymentSheet(); openPaymentSheet()}}
                disabled={loading}
            />
            {/* <Text style={styles.paymentLink} onPress={()=>{openPaymentSheet();}}>Open payment sheet</Text> */}
        </>
    );
}

const styles = StyleSheet.create({
    paymentLink: {
        color: '#3D6734',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
    }
});