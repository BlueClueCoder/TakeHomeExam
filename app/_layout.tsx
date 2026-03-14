import { createStackNavigator } from "@react-navigation/stack";
import UserSubscriptionProvider from "./contexts/UserSubscriptionContext";
import index from "./index";
import SubscriptionListView from "./views/SubscriptionListView";
import SubscriptionRecordView from "./views/SubscriptionRecordView";
import UserListView from "./views/UserListView";
import UserRecordView from "./views/UserRecordView";

export default function RootLayout() {
  const Stack = createStackNavigator();

  return (

      <UserSubscriptionProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={index}></Stack.Screen>
          <Stack.Screen name="Users" component={UserListView}></Stack.Screen>
          <Stack.Screen name="Edit User" component={UserRecordView}></Stack.Screen>
          <Stack.Screen name="Subscriptions" component={SubscriptionListView}></Stack.Screen>
          <Stack.Screen name="Edit Subscription" component={SubscriptionRecordView}></Stack.Screen>
        </Stack.Navigator>
      </UserSubscriptionProvider>

  )
  
}
