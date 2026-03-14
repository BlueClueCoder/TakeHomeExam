import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the Home Page.</Text>
      <Link href="/views/UserListView">View Users</Link>
      <Link href="/views/SubscriptionListView">View Subscriptions</Link>
    </View>
  );
}
