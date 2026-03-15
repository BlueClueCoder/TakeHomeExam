import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Button, Modal, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { UserSubscriptionContext } from "../contexts/UserSubscriptionContext";
import { IUser } from "../datatypes/IUser";

export default function UserRecordView()
{
    const UserSubscriptionInfo = useContext(UserSubscriptionContext);
    const [isRemoving, setIsRemoving] = useState(false);

    const chosenID: number = UserSubscriptionInfo.selectedUser;
    const userOfInterest = UserSubscriptionInfo.users.find(user => user.accountID === chosenID);
    const navigator = useNavigation();

    //filtered version of the subscriptions list
    const linkedSubscriptions = UserSubscriptionInfo.subscriptions.filter(
        (value) => value.subscriptionOwner === chosenID && value.isActive
    );

    function _triggerRemoveModal() {
        if (isRemoving) return;
        setIsRemoving(true);
    }

    function _handleCancel() {
        setIsRemoving(false);
    }

    function _handleRemoval(selectedUser: number) {
            // set to not active
            const newUsers: IUser[] = UserSubscriptionInfo.users.splice(0);
    
            //find index of targetted subscription
            const targetIndex = newUsers.findIndex(user => user.accountID === selectedUser)
            
            //set it to removed
            newUsers[targetIndex].isActive = false;

            //deactivate all linked subscriptions
            const newSubscriptions = UserSubscriptionInfo.subscriptions.splice(0);
            for (let i = 0; i < newSubscriptions.length; i++) {
                if (newSubscriptions[i].subscriptionOwner === selectedUser) {
                    newSubscriptions[i].isActive = false;
                }
            }
            
            UserSubscriptionInfo.changeUsers(newUsers);
            UserSubscriptionInfo.changeSubscriptions(newSubscriptions);
            setIsRemoving(false);
            navigator.navigate("Users");
        }

        function _handleSelectSubscription(selectedSub: number) {
            UserSubscriptionInfo.changeSelectedSubscription(selectedSub);
            navigator.navigate("Edit Subscription");
        }

    return (
        <View>
            <Text> This is the User Record Page. </Text>
            <Text>{chosenID}</Text>
            <Text>{userOfInterest?.userName}</Text>
            <Text>{userOfInterest?.email}</Text>
            <Text>{userOfInterest?.phoneNumber}</Text>
            <Text>{userOfInterest?.startDate.toString()}</Text>
            <View>
                <Text>List of Linked Subscriptions</Text>
                <ScrollView>
                    {linkedSubscriptions.length === 0 && 
                        <Text>No vehicle subscriptions linked to this user yet</Text>
                    }
                    {linkedSubscriptions.map((subscription) => {
                        return (
                            <View style={{flexDirection: "row"}}>
                                <Text>{subscription.startDate.toString()}</Text>
                                <Text>{subscription.subscriptionType}</Text>
                                <Text>{subscription.licensePlate}</Text>
                                <Button title="View This Subscription" onPress={() => _handleSelectSubscription(subscription.subscriptionID)}></Button>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <Button title="Terminate User Account" onPress={() => _triggerRemoveModal()}></Button>
            <Button title="Return to User List" onPress={() => navigator.navigate("Users")}></Button>
            <Button title="Return Home" onPress={() => navigator.navigate("Home")}></Button>
            <Modal animationType="slide" visible={isRemoving}>
                <Text>Cancel User Account?</Text>
                <Text>Warning: All subscriptions attached to this account will be deactivated!</Text>
                <Button title="Confirm Termination" color="green" onPress={() => _handleRemoval(chosenID)}></Button>
                <Button title="Cancel Action" color="red" onPress={() => _handleCancel()}></Button>
            </Modal>
        </View>
    )
}