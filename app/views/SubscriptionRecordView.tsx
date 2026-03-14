import { Link, useNavigation } from "expo-router";
import { Button, Text, View } from "react-native";

export default function SubscriptionRecordView()
{
    const navigator = useNavigation();

    return (
        <View>
            <Text> This is the Subscription Record Page. </Text>
            <Link href="/views/SubscriptionListView">Return to Subscriptions List</Link>
            <Button title="Return Home" onPress={() => navigator.navigate("Home")}></Button>
        </View>
    )
}