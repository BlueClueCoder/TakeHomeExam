import { useNavigation } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";
import { EButtonUse, PatButton } from "./components/PatButton";
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
      <PatButton use={EButtonUse.Navigate} text="View Users" pushed={() => navigator.navigate("Users")}></PatButton>
      <PatButton use={EButtonUse.Navigate} text="View Subscriptions" pushed={() => navigator.navigate("Subscriptions")}></PatButton>
    </View>
  );
}
