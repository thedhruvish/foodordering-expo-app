import { View, Text, Platform, FlatList } from "react-native";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";

const CartScreen = () => {
  const { items, total } = useCart();
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 1 }}
      />
      <Text
        style={{ marginTop: 20, fontSize: 20, fontWeight: "500", color: "red" }}
      >
        Total : {total.toString()}
      </Text>
      <Button text="checkout" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
