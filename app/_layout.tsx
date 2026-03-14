import { Stack } from "expo-router";
import UserSubscriptionProvider from "./contexts/UserSubscriptionContext";

export default function RootLayout() {

  return (
    <UserSubscriptionProvider>
      <Stack />
    </UserSubscriptionProvider>

  )
  
}
