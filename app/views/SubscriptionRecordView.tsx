import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Button, Modal, ScrollView, Text, View } from "react-native";
import { UserSubscriptionContext } from "../contexts/UserSubscriptionContext";
import { ISubscription } from "../datatypes/ISubscription";

export default function SubscriptionRecordView()
{
    const [isRemoving, setIsRemoving] = useState(false);
    const [isTransferring, setIsTransferring] = useState(false);

    const UserSubscriptionInfo = useContext(UserSubscriptionContext);
    
    const chosenID: number = UserSubscriptionInfo.selectedSubscription;
    const subscriptionOfInterest = UserSubscriptionInfo.subscriptions.find(subscription => subscription.subscriptionID === chosenID);
   
    // users not tied to this subscriptions
    const transerTargets = UserSubscriptionInfo.users.filter((value) => value.isActive && value.accountID !== subscriptionOfInterest?.subscriptionOwner)

    const navigator = useNavigation();

    function _triggerRemoveModal() {
        if (isRemoving) return;
        setIsRemoving(true);
    }

    function _triggerTransferModal() {
        if (isTransferring) return;
        setIsTransferring(true);
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

    function _handleTransfer(newUser: number, selectedSub: number) {
        // set ownerID of subscription
        const newSubs = UserSubscriptionInfo.subscriptions.splice(0);
        const indexOfTarget = newSubs.findIndex((sub) => sub.subscriptionID === selectedSub);
        newSubs[indexOfTarget].subscriptionOwner = newUser;
        UserSubscriptionInfo.changeSubscriptions(newSubs);
        
        // close modal
        setIsTransferring(false);
    }

    function _handleCancelRemoval() {
        setIsRemoving(false);
    }

    function _handleCancelTransfer() {
        setIsTransferring(false);
    }

    return (
        <View>
            <Text> This is the Subscription Record Page. </Text>
            <Text>{chosenID}</Text>
            <Text>{subscriptionOfInterest?.subscriptionOwner}</Text>
            <Text>{subscriptionOfInterest?.licensePlate}</Text>
            <Text>{subscriptionOfInterest?.subscriptionType}</Text>
            <Text>{subscriptionOfInterest?.startDate.toString()}</Text>
            <Button title="Transfer Subscription" onPress={() => _triggerTransferModal()}></Button>
            <Button title="Remove Subscription" onPress={() => _triggerRemoveModal()}></Button>
            <Button title="Return to Subscriptions List" onPress={() => navigator.navigate("Subscriptions")}></Button>
            <Button title="Return Home" onPress={() => navigator.navigate("Home")}></Button>
            <Modal visible={isRemoving} animationType="slide">
                <Text>Are you sure you want to remove this subscription?</Text>
                <Button title="Confirm Removal" color="green" onPress={() => _handleRemoval(chosenID)}></Button>
                <Button title="Cancel Removal" color="red" onPress={() => _handleCancelRemoval()}></Button>
            </Modal>
            <Modal animationType="slide" visible={isTransferring}>
                <Text>Select the user to transfer this subscription to.</Text>
                <ScrollView>
                    { transerTargets.map((user) => {
                        return (
                            <View style={{flexDirection: "row"}}>
                                <Text>{user.accountID}</Text>
                                <Text>{user.userName}</Text>
                                <Button title="Transfer" onPress={() => _handleTransfer(user.accountID, chosenID)}></Button>
                            </View>
                        )
                    })}
                    {transerTargets.length < 1 && 
                        <Text>No Potential Transfer Targets</Text>
                    }
                </ScrollView>
                <Button title="Cancel Transfer" onPress={() => _handleCancelTransfer()}></Button>
            </Modal>
        </View>
    )
}