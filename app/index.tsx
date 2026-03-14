import { Link } from "expo-router";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { UserSubscriptionContext } from "./contexts/UserSubscriptionContext";
import { IUser } from "./datatypes/IUser";

export default function Index() {
  const UserSubscriptionInfo = useContext(UserSubscriptionContext);

  function _updateList() {
    const newUsers: IUser[] = UserSubscriptionInfo.users.splice(0);
    if (newUsers[0].userName === "Pablo") {
      newUsers[0].userName = "Jimmy";
    } else {
      newUsers[0].userName = "Pablo";
    }
    UserSubscriptionInfo.changeUsers(newUsers);
  }

  function _updateText(newString: string) {
    let userPlaceholder = UserSubscriptionInfo.users[0];
    userPlaceholder.userName = newString;
    UserSubscriptionInfo.changePlaceholder(userPlaceholder);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the Home Page.</Text>
      <Text>{UserSubscriptionInfo.users[0].userName}</Text>
      <Button title="Click to Change" onPress={() => _updateList()}></Button>
      <Link href="/views/UserListView">View Users</Link>
      <Link href="/views/SubscriptionListView">View Subscriptions</Link>
    </View>
  );
}
