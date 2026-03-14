import { useNavigation } from "expo-router";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { UserSubscriptionContext } from "../contexts/UserSubscriptionContext";

export default function SubscriptionRecordView()
{
    const UserSubscriptionInfo = useContext(UserSubscriptionContext);
    const chosenID: number | undefined = UserSubscriptionInfo.selectedSubscription;
    const subscriptionOfInterest = UserSubscriptionInfo.subscriptions.find(subscription => subscription.subscriptionID === chosenID);
    const navigator = useNavigation();

    return (
        <View>
            <Text> This is the Subscription Record Page. </Text>
            <Text>{chosenID}</Text>
            <Text>{subscriptionOfInterest?.subscriptionOwner}</Text>
            <Text>{subscriptionOfInterest?.licensePlate}</Text>
            <Text>{subscriptionOfInterest?.subscriptionType}</Text>
            <Text>{subscriptionOfInterest?.startDate.toString()}</Text>
            <Button title="Return to Subscriptions List" onPress={() => navigator.navigate("Subscriptions")}></Button>
            <Button title="Return Home" onPress={() => navigator.navigate("Home")}></Button>
        </View>
    )
}