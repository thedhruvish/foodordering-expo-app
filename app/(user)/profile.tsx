import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  return (
    <View>
      <Text>Profile</Text>
      <Button
        title="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
}
