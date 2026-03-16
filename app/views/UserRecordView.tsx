import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Modal, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { EButtonUse, PatButton } from "../components/PatButton";
import { UserSubscriptionContext } from "../contexts/UserSubscriptionContext";
import { IUser } from "../datatypes/IUser";

export default function UserRecordView()
{
    const UserSubscriptionInfo = useContext(UserSubscriptionContext);
    const [isRemoving, setIsRemoving] = useState(false);
    const [isEditting, setIsEditting] = useState(false);
    const [tempName, setTempName] = useState("");
    const [tempPhoneNumber, setTempPhoneNumber] = useState("");
    const [tempEmail, setTempEmail] = useState("");

    const navigator = useNavigation();

    const chosenID: number = UserSubscriptionInfo.selectedUser;
    const userOfInterest = UserSubscriptionInfo.users.find(user => user.accountID === chosenID);

    // filtered version of the subscriptions list
    const linkedSubscriptions = UserSubscriptionInfo.subscriptions.filter(
        (value) => value.subscriptionOwner === chosenID && value.isActive
    );

    // filtered version of the purchases list
    const linkedPurchases = UserSubscriptionInfo.purchases.filter(
        (value) => value.payingUser === chosenID
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

    function _triggerEditMode() {
        setIsEditting(true);
    }

    function _cancelEditMode() {
        setIsEditting(false);
    }

    function _saveChanges(changedUser: number) {
        // update userList
        const newUsers = UserSubscriptionInfo.users.splice(0);
        const foundIndex = newUsers.findIndex((user) => (user.accountID === changedUser));
        newUsers[foundIndex].email = tempEmail;
        newUsers[foundIndex].userName = tempName;
        newUsers[foundIndex].phoneNumber = tempPhoneNumber;

        UserSubscriptionInfo.changeUsers(newUsers);

        setIsEditting(false);
    }

    return (
        <View>
            <Text> This is the User Record Page. </Text>
            <Text>{"Account ID: " + chosenID}</Text>
            {isEditting && <input defaultValue={userOfInterest?.userName} onChange={e => setTempName(e.target.value)}></input>}
            {!isEditting && <Text>{userOfInterest?.userName}</Text>}
            {isEditting && <input defaultValue={userOfInterest?.email} onChange={e => setTempEmail(e.target.value)}></input>}
            {!isEditting && <Text>{userOfInterest?.email}</Text>}
            {isEditting && <input defaultValue={userOfInterest?.phoneNumber} onChange={e => setTempPhoneNumber(e.target.value)}></input>}
            {!isEditting && <Text>{userOfInterest?.phoneNumber}</Text>}
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
                                <PatButton use={EButtonUse.Info} text="View This Subscription" pushed={() => _handleSelectSubscription(subscription.subscriptionID)}></PatButton>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View>
                <Text>Payment History</Text>
                <ScrollView>
                    {linkedPurchases.length === 0 && 
                        <Text>No payments linked to this user yet</Text>
                    }
                    {linkedPurchases.map((purchase) => {
                        return (
                            <View style={{flexDirection: "row"}}>
                                <Text>{purchase.receiptID}</Text>
                                <Text>{purchase.purchaseDate.toString()}</Text>
                                <Text>{purchase.purchaseAmount}</Text>
                                <Text>{purchase.memo}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            {!isEditting && <PatButton use={EButtonUse.Confirm} text="Edit User Account" pushed={() => _triggerEditMode()}></PatButton>}
            {isEditting && <PatButton use={EButtonUse.Confirm} text="Save Edits" pushed={() => _saveChanges(chosenID)}></PatButton>}
            {isEditting && <PatButton use={EButtonUse.Reject} text="Cancel Edits" pushed={() => _cancelEditMode()}></PatButton>}
            {!isEditting && <PatButton use={EButtonUse.Reject} text="Terminate User Account" pushed={() => _triggerRemoveModal()}></PatButton>}
            {!isEditting && <PatButton use={EButtonUse.Navigate} text="Return to User List" pushed={() => navigator.navigate("Users")}></PatButton>}
            {!isEditting && <PatButton use={EButtonUse.Navigate} text="Return Home" pushed={() => navigator.navigate("Home")}></PatButton>}
            <Modal animationType="slide" visible={isRemoving}>
                <Text>Cancel User Account?</Text>
                <Text>Warning: All subscriptions attached to this account will be deactivated!</Text>
                <PatButton use={EButtonUse.Confirm} text="Confirm Termination" pushed={() => _handleRemoval(chosenID)}></PatButton>
                <PatButton use={EButtonUse.Reject} text="Cancel Termination" pushed={() => _handleCancel()}></PatButton>
            </Modal>
        </View>
    )
}