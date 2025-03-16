import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import OrderItemListItem from "@/components/OrderListItem";
import { useAdminOrderList } from "@/api/orders";

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch </Text>;
  }

  return (
    <FlatList
      data={orders}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      renderItem={({ item }) => <OrderItemListItem order={item} />}
    />
  );
}
