import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Button, Modal, ScrollView, Text, View } from "react-native";
import { EButtonUse, PatButton } from "../components/PatButton";
import { UserSubscriptionContext } from "../contexts/UserSubscriptionContext";
import { ESubscriptionType } from "../datatypes/ESubscriptionType";
import { ISubscription } from "../datatypes/ISubscription";

export default function SubscriptionRecordView()
{
    const [isRemoving, setIsRemoving] = useState(false);
    const [isTransferring, setIsTransferring] = useState(false);
    const [isEditting, setIsEditting] = useState(false);
    
    const [tempSubType, setTempSubType] = useState(ESubscriptionType.ECoal);

    const UserSubscriptionInfo = useContext(UserSubscriptionContext);
    
    const chosenID: number = UserSubscriptionInfo.selectedSubscription;
    const subscriptionOfInterest = UserSubscriptionInfo.subscriptions.find(subscription => subscription.subscriptionID === chosenID);
    const subscriberOfInterest = UserSubscriptionInfo.users.find(subscriber => subscriber.accountID === subscriptionOfInterest?.subscriptionOwner);
    const [tempLicensePlate, setTempLicensePlate] = useState(subscriptionOfInterest?.licensePlate);

    // users not tied to this subscriptions
    const transerTargets = UserSubscriptionInfo.users.filter(
        (value) => value.isActive && value.accountID !== subscriptionOfInterest?.subscriptionOwner
    );

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

    // Edit Functions
    function _handleSave(changedSub: number) {
        const newSubs = UserSubscriptionInfo.subscriptions.splice(0);
        const foundIndex = newSubs.findIndex((sub) => (sub.subscriptionID === changedSub));
        newSubs[foundIndex].licensePlate = tempLicensePlate;
        newSubs[foundIndex].subscriptionType = tempSubType;

        UserSubscriptionInfo.changeSubscriptions(newSubs);
        
        
        setIsEditting(false);
    }

    function _triggerEditMode() {
        setIsEditting(true);
    }
    
    function _handleCancelEdit() {
        setIsEditting(false);
    }

    function _handleSubTypeAssignment(newType: string) {
        switch (newType) {
            case "Coal":
                setTempSubType(ESubscriptionType.ECoal);
                break;
            case "Bronze":
                setTempSubType(ESubscriptionType.EBronze);
                break;
            case "Silver":
                setTempSubType(ESubscriptionType.ESilver);
                break;
            case "Gold":
                setTempSubType(ESubscriptionType.EGold);
                break;
            case "Platinum":
                setTempSubType(ESubscriptionType.EPlatinum);
                break;
        }
    }

    return (
        <View style={{
            flex: 1,
            height: '100%',
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "cadetblue"
        }}>
            <View style={{
                flex: 1,
                maxHeight: '70%',
                minWidth: '25%',
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "lightseagreen",
                borderRadius: 4,
                shadowRadius: 6,
                shadowColor: '#111',
                shadowOffset: {width: -2, height: 2},
                padding: 10

            }}>
                <View
                    style={{
                        flex: 2,
                        padding: 4,
                        justifyContent: "center"
                    }}
                >
                    <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontWeight: "bold", fontSize: 30}}>Subscription Record</Text>
                </View>
                <View
                    style={{
                        flex: 3,
                        padding: 4,
                        borderRadius: 6,
                        backgroundColor: "darkcyan",
                        minWidth: '70%',
                        justifyContent: 'space-evenly',
                        shadowRadius: 6,
                        shadowColor: '#111',
                        shadowOffset: {width: -2, height: 2},
                        margin: 6,
                        paddingLeft: 10,
                        
                    }}
                >
                    <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Subscription ID: " + chosenID}</Text>
                    <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Subscription Owner: " + subscriberOfInterest?.userName}</Text>
                    {!isEditting && <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Vehicle License Plate: " + subscriptionOfInterest?.licensePlate}</Text>}
                    {isEditting && <input defaultValue={subscriptionOfInterest?.licensePlate} onChange={(e) => setTempLicensePlate(e.target.value)}></input>}
                    {!isEditting && <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Subscription Type: " + subscriptionOfInterest?.subscriptionType}</Text>}
                    {isEditting && 
                        <select defaultValue={subscriptionOfInterest?.subscriptionType} onChange={(e) => _handleSubTypeAssignment(e.target.value)}>
                            <option value={ESubscriptionType.ECoal}>Coal Subscription</option>
                            <option value={ESubscriptionType.EBronze}>Bronze Subscription</option>
                            <option value={ESubscriptionType.ESilver}>Silver Subscription</option>
                            <option value={ESubscriptionType.EGold}>Gold Subscription</option>
                            <option value={ESubscriptionType.EPlatinum}>Platinum Subscription</option>
                        </select>
                    }
                    <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Start Date: " + subscriptionOfInterest?.startDate.toString().substring(4, 15)}</Text>
                </View>
                <View style={{flex: 1}}></View>
                <View 
                style={{
                    flex: 1,
                    maxHeight: '10%',
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "cadetblue",
                    shadowRadius: 6,
                    shadowColor: '#111',
                    shadowOffset: {width: -2, height: 2},
                    minWidth: '90%',
                    marginVertical: 4,
                }}
                >
                    {!isEditting && <PatButton use={EButtonUse.Info} text="Edit" pushed={() => _triggerEditMode()}></PatButton>}
                    {isEditting && <PatButton use={EButtonUse.Confirm} text="Save Changes" pushed={() => _handleSave(chosenID)}></PatButton>}
                    {isEditting && <PatButton use={EButtonUse.Reject} text="Cancel Changes" pushed={() => _handleCancelEdit()}></PatButton>}
                    {!isEditting && <PatButton use={EButtonUse.Info} text="Transfer" pushed={() => _triggerTransferModal()}></PatButton>}
                    {!isEditting && <PatButton use={EButtonUse.Reject} text="Remove" pushed={() => _triggerRemoveModal()}></PatButton>}
                </View>
            {!isEditting && 
                <View 
                style={{
                    flex: 1,
                    maxHeight: '10%',
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "cadetblue",
                    shadowRadius: 6,
                    shadowColor: '#111',
                    shadowOffset: {width: -2, height: 2},
                    minWidth: '90%',
                    margin: 4,
                }}
                >
                    <PatButton use={EButtonUse.Navigate} text="Return to Subscriptions List" pushed={() => navigator.navigate("Subscriptions")}></PatButton>
                    <PatButton use={EButtonUse.Navigate} text="Return Home" pushed={() => navigator.navigate("Home")}></PatButton>
                </View>}
            </View>
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
                                <PatButton use={EButtonUse.Confirm} text="Transfer" pushed={() => _handleTransfer(user.accountID, chosenID)}></PatButton>
                            </View>
                        )
                    })}
                    {transerTargets.length < 1 && 
                        <Text>No Potential Transfer Targets</Text>
                    }
                </ScrollView>
                <PatButton use={EButtonUse.Reject} text="Cancel Transfer" pushed={() => _handleCancelTransfer()}></PatButton>
            </Modal>
        </View>
    )
}