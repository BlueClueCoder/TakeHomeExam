import { useNavigation } from "expo-router";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { UserSubscriptionContext } from "./contexts/UserSubscriptionContext";

export default function Index() {
  const UserSubscriptionInfo = useContext(UserSubscriptionContext);
  const navigator = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the Home Page.</Text>
      <Button onPress={() => navigator.navigate("Users")} title="View Users"></Button>
      <Button onPress={() => navigator.navigate("Subscriptions")} title="View Subscriptions"></Button>
    </View>
  );
}
