import { Alert } from "react-native";
import { supabase } from "./supabase";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: {
      amount,
    },
  });
  if (data) {
    return data;
  }
  Alert.alert("Error Fetching payment sheet params ");
  return {};
};

export const initialisePaymentSheet = async (amount: number) => {
  console.log("In ", amount);
  const { paymentIntent, publishableKey, customer, ephemeralKey } =
    await fetchPaymentSheetParams(amount);
  if (!paymentIntent || !publishableKey) {
    await initPaymentSheet({
      merchantDisplayName: "aadytech",
      paymentIntentClientSecret: paymentIntent,
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      defaultBillingDetails: {
        name: "dhruvish lathiya",
      },
    });
  }
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();
  if (error) {
    Alert.alert(error.message);
    return false;
  }
  return true;
};
