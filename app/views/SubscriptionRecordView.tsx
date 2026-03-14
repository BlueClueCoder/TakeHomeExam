import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function SubscriptionRecordView()
{
    return (
        <View>
            <Text> This is the Subscription Record Page. </Text>
            <Link href="/views/SubscriptionListView">Return to Subscriptions List</Link>
            <Link href="../..">Return Home</Link>
        </View>
    )
}