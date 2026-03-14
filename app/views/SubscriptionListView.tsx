import { Link, useNavigation } from "expo-router";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { UserSubscriptionContext } from "../contexts/UserSubscriptionContext";

export default function SubscriptionListView()
{   
    const UserSubscriptionInfo = useContext(UserSubscriptionContext);
    const navigator = useNavigation();
    return (
        <View>
            <Text> This is the Subscription List Page. </Text>
            <Link href="/views/SubscriptionRecordView">Visit Specific Subscription Record</Link>
            <Button title="Return Home" onPress={() => navigator.navigate("Home")}></Button>
            
        </View>
    )
}