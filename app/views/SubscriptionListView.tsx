import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function SubscriptionListView()
{
    return (
        <View>
            <Text> This is the Subscription List Page. </Text>
            <Link href="/views/SubscriptionRecordView">Visit Specific Subscription Record</Link>
            <Link href="../..">Return Home</Link>
            
        </View>
    )
}