import { StripeProvider } from '@stripe/stripe-react-native';
import * as Linking from 'expo-linking';
import React from 'react';
export default function ExpoStripeProvider(
    props: Omit<React.ComponentProps<typeof StripeProvider>, 'publishableKey' | 'urlScheme'>
) {
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}
      urlScheme={Linking.createURL("/")?.split(":")[0]}
      {...props}
    />
  );
}
