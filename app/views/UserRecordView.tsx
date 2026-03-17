import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
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
        <View 
            style={{
                backgroundColor: "mediumaquamarine", 
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{flex: 1, flexDirection: "column", justifyContent: "center"}}>
                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontWeight: "bold", fontSize: 60}}>User Record</Text>
            </View>
            <View
                style={{
                    flex: 2,
                    padding: 4,
                    borderRadius: 6,
                    backgroundColor: "darkcyan",
                    minWidth: '30%',
                    maxHeight: '30%',
                    justifyContent: 'space-evenly',
                    shadowRadius: 6,
                    shadowColor: '#111',
                    shadowOffset: {width: -2, height: 2},
                    margin: 6,
                    paddingLeft: 15,
                }}
            >
                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Account ID: " + chosenID}</Text>
                {isEditting && <input defaultValue={userOfInterest?.userName} onChange={e => setTempName(e.target.value)}></input>}
                {!isEditting && <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Username: " + userOfInterest?.userName}</Text>}
                {isEditting && <input defaultValue={userOfInterest?.email} onChange={e => setTempEmail(e.target.value)}></input>}
                {!isEditting && <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Email: " + userOfInterest?.email}</Text>}
                {isEditting && <input defaultValue={userOfInterest?.phoneNumber} onChange={e => setTempPhoneNumber(e.target.value)}></input>}
                {!isEditting && <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Phone Number: " + userOfInterest?.phoneNumber}</Text>}
                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Start Date: " + userOfInterest?.startDate.toString().substring(4, 15)}</Text>
            </View>
            <View 
                style={{
                    flex: 2,
                    flexDirection: "column",
                    backgroundColor: '#5F58DA',
                    marginBottom: 10,
                    marginTop: 10,
                    minWidth: '30%',
                    borderRadius: 2,
                    shadowRadius: 6,
                    shadowColor: '#111',
                    shadowOffset: {width: -2, height: 2},
                    padding: 10,
                }}
            >
                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>Linked Subscriptions</Text>
                <ScrollView
                >
                    {linkedSubscriptions.length === 0 && 
                        <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontWeight: "bold", fontSize: 16}}>No vehicle subscriptions linked to this user yet</Text>
                    }
                    {linkedSubscriptions.map((subscription) => {
                        return (
                            <View style={{flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "white", alignItems: "center", padding: 2 }}>
                                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 16}}>{subscription.startDate.toString().substring(4, 15)}</Text>
                                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 16}}>{subscription.subscriptionType}</Text>
                                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 16}}>{subscription.licensePlate}</Text>
                                <PatButton use={EButtonUse.Info} text="View This Subscription" pushed={() => _handleSelectSubscription(subscription.subscriptionID)}></PatButton>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>

            <View 
                style={{
                    flex: 2,
                    flexDirection: "column",
                    backgroundColor: '#5F58DA',
                    marginBottom: 10,
                    marginTop: 10,
                    minWidth: '50%',
                    borderRadius: 2,
                    shadowRadius: 6,
                    shadowColor: '#111',
                    shadowOffset: {width: -2, height: 2},
                    padding: 10,
            }}>
                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>Payment History</Text>
                <ScrollView>
                    {linkedPurchases.length === 0 && 
                        <Text>No payments linked to this user yet</Text>
                    }
                    {linkedPurchases.map((purchase) => {
                        return (
                            <View style={{flexDirection: "row", justifyContent: "space-evenly", borderBottomWidth: 1, borderColor: "white" }}>
                                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 16}}>{"Receipt ID: " + purchase.receiptID}</Text>
                                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 16}}>{purchase.purchaseDate.toString().substring(4, 15)}</Text>
                                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 16}}>{"$" + purchase.purchaseAmount}</Text>
                                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 16}}>{purchase.memo}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            
            <View 
                style={{
                    flex: 1, 
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "cadetblue",
                    shadowRadius: 6,
                    shadowColor: '#111',
                    shadowOffset: {width: -2, height: 2},
                    minWidth: '30%',
                    maxHeight: '5%',
                    padding: 8,
                    margin: 8,
                }}
            >
                {!isEditting && <PatButton use={EButtonUse.Confirm} text="Edit User Account" pushed={() => _triggerEditMode()}></PatButton>}
                {isEditting && <PatButton use={EButtonUse.Confirm} text="Save Edits" pushed={() => _saveChanges(chosenID)}></PatButton>}
                {isEditting && <PatButton use={EButtonUse.Reject} text="Cancel Edits" pushed={() => _cancelEditMode()}></PatButton>}
                {!isEditting && <PatButton use={EButtonUse.Reject} text="Terminate User Account" pushed={() => _triggerRemoveModal()}></PatButton>}
            </View>

            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "cadetblue",
                    shadowRadius: 6,
                    shadowColor: '#111',
                    shadowOffset: {width: -2, height: 2},
                    minWidth: '30%',
                    maxHeight: '5%',
                    padding: 8,
                    margin: 4,
                    }}
            >
                {!isEditting && <PatButton use={EButtonUse.Navigate} text="Return to User List" pushed={() => navigator.navigate("Users")}></PatButton>}
                {!isEditting && <PatButton use={EButtonUse.Navigate} text="Return Home" pushed={() => navigator.navigate("Home")}></PatButton>}
            </View>

            <View style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Modal animationType="slide" visible={isRemoving} transparent={true}>
                    <View style={{
                        backgroundColor: "seagreen",
                        flex: 1, 
                        maxHeight: '30%',
                        maxWidth: '40%',
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 4,
                        marginTop: '10%',
                        padding: 10,
                        marginLeft: '30%'
                    }}>
                        <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontWeight: "bold", fontSize: 40}}>Terminate User Account?</Text>
                        <div style={{height: 5}}></div>
                        <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontSize: 20}}>WARNING: All subscriptions attached to this account will be deactivated!</Text>
                        <div style={{height: 20}}></div>
                        <PatButton use={EButtonUse.Reject} text="Confirm Termination" pushed={() => _handleRemoval(chosenID)}></PatButton>
                        <div style={{height: 10}}></div>
                        <PatButton use={EButtonUse.Navigate} text="Cancel Termination" pushed={() => _handleCancel()}></PatButton>
                    </View>
                </Modal>
            </View>
        </View>
    )
}