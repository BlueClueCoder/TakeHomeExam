import { useNavigation } from "expo-router";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { UserSubscriptionContext } from "../contexts/UserSubscriptionContext";

export default function SubscriptionListView()
{   
    const UserSubscriptionInfo = useContext(UserSubscriptionContext);
    const navigator = useNavigation();

    function _navigateToSubscription(selectedSubscription: number) {
        UserSubscriptionInfo.changeSelectedSubscription(selectedSubscription);
        navigator.navigate("Edit Subscription");

    }

    return (
        <View>
            <Text> This is the Subscription List Page. </Text>
            <View style={{flexDirection: "row"}}>
                <Text>Subscription ID</Text>
                <Text>Subscribed User</Text>
                <Text>Vehicle License Plate</Text>
                <Text>Subscription Type</Text>
                <Text>Start Date</Text>
                <Text>View Subscription?</Text>   
            </View>
            {UserSubscriptionInfo.subscriptions.map((value) => {
                if (!value.isActive) return;
                return (
                    <View style={{flexDirection: "row"}}>
                        <Text>{value.subscriptionID}</Text>
                        <Text>{value.subscriptionOwner}</Text>
                        <Text>{value.licensePlate}</Text>
                        <Text>{value.subscriptionType}</Text>
                        <Text>{value.startDate.toString()}</Text>
                        <Button title="View Subscription" onPress={() => _navigateToSubscription(value.subscriptionID)}></Button>
                    </View>
                )
            })}
            <View>
                {UserSubscriptionInfo.subscriptions.length === 0 &&
                <Text>No Subscriptions Found in Database</Text>
                }
            </View>
            <Button title="Return Home" onPress={() => navigator.navigate("Home")}></Button>
            
        </View>
    )
}