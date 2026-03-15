import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Button, Modal, Text, View } from "react-native";
import { UserSubscriptionContext } from "../contexts/UserSubscriptionContext";
import { ISubscription } from "../datatypes/ISubscription";

export default function SubscriptionRecordView()
{
    const [isRemoving, setIsRemoving] = useState(false);
    const UserSubscriptionInfo = useContext(UserSubscriptionContext);
    const chosenID: number = UserSubscriptionInfo.selectedSubscription;
    const subscriptionOfInterest = UserSubscriptionInfo.subscriptions.find(subscription => subscription.subscriptionID === chosenID);
    const navigator = useNavigation();

    function _triggerRemoveModal() {
        if (isRemoving) return;
        setIsRemoving(true);
    }

    function _handleRemoval(selectedSubscription: number) {
        // set to not active
        const newSubscriptions: ISubscription[] = UserSubscriptionInfo.subscriptions.splice(0);

        //find index of targetted subscription
        const targetIndex = newSubscriptions.findIndex(subscription => subscription.subscriptionID === selectedSubscription)
        
        //set it to removed
        newSubscriptions[targetIndex].isActive = false;
        
        UserSubscriptionInfo.changeSubscriptions(newSubscriptions);
        // set isRemoving to false
        setIsRemoving(false);
        // navigate to Subscription list
        navigator.navigate("Subscriptions");
    }

    function _handleCancel() {
        // set to not active
        // set isRemoving to false
        setIsRemoving(false);
        // navigate to Subscription list
    }

    return (
        <View>
            <Text> This is the Subscription Record Page. </Text>
            <Text>{chosenID}</Text>
            <Text>{subscriptionOfInterest?.subscriptionOwner}</Text>
            <Text>{subscriptionOfInterest?.licensePlate}</Text>
            <Text>{subscriptionOfInterest?.subscriptionType}</Text>
            <Text>{subscriptionOfInterest?.startDate.toString()}</Text>
            <Button title="Remove Subscription" onPress={() => _triggerRemoveModal()}></Button>
            <Button title="Return to Subscriptions List" onPress={() => navigator.navigate("Subscriptions")}></Button>
            <Button title="Return Home" onPress={() => navigator.navigate("Home")}></Button>
            <Modal visible={isRemoving} animationType="slide">
                <Text>Are you sure you want to remove this subscription?</Text>
                <Button title="Confirm Removal" color="green" onPress={() => _handleRemoval(chosenID)}></Button>
                <Button title="Cancel Removal" color="red" onPress={() => _handleCancel()}></Button>
            </Modal>
        </View>
    )
}