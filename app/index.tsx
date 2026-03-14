import { Link } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";
import { UserSubscriptionContext } from "./contexts/UserSubscriptionContext";

export default function Index() {
  const UserSubscriptionInfo = useContext(UserSubscriptionContext);
  const placeHolder = UserSubscriptionInfo.users[0].userName;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the Home Page.</Text>
      <Text>{placeHolder}</Text>
      <Link href="/views/UserListView">View Users</Link>
      <Link href="/views/SubscriptionListView">View Subscriptions</Link>
    </View>
  );
}
