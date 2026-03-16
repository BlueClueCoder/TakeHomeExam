import { useNavigation } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";
import { EButtonUse, PatButton } from "../components/PatButton";
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
                        <PatButton use={EButtonUse.Info} text="View Subscription" pushed={() => _navigateToSubscription(value.subscriptionID)}></PatButton>
                    </View>
                )
            })}
            {UserSubscriptionInfo.subscriptions.filter((sub) => sub.isActive).length < 1 &&
                <Text>No subscriptions currently active</Text>
            }
            <View>
                {UserSubscriptionInfo.subscriptions.length === 0 &&
                <Text>No Subscriptions Found in Database</Text>
                }
            </View>
            <PatButton use={EButtonUse.Confirm} text="Create Subscription" pushed={() => navigator.navigate("Add Subscription")}></PatButton>
            <PatButton use={EButtonUse.Navigate} text="Return Home" pushed={() => navigator.navigate("Home")}></PatButton>
        </View>
    )
}