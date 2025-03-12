import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";

export default function CreateProductScreen() {
  const [image, setImage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [error, setError] = useState("");

  const resetFields = () => {
    setName("");
    setPrice("");
    setError("");
  };

  const validateInput = () => {
    setError("");
    if (!name) {
      setError("Name is required");
      return false;
    }
    if (!price) {
      setError("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setError("Price is not a Number");
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    resetFields();
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Create Product" }} />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>
      <Text style={styles.label}>Create</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="name"
        style={styles.input}
      />

      <Text style={styles.label}>Price (₹)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="500"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: "red" }}>{error}</Text>
      <Button onPress={onCreate} text="Create" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
});
