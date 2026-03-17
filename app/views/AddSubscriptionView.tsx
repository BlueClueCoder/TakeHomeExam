import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { EButtonUse, PatButton } from "../components/PatButton";
import { UserSubscriptionContext } from "../contexts/UserSubscriptionContext";
import { ESubscriptionType } from "../datatypes/ESubscriptionType";
import { ISubscription } from "../datatypes/ISubscription";

export default function AddSubscriptionView() {
    const navigator = useNavigation();
    const { subIDCount, subscriptions, users, changeSubscriptions, changeSubIDCount } = useContext(UserSubscriptionContext);
    const [ tempSubType, setTempSubType ] = useState("Coal");
    const [ tempLPNum, setTempLPNum ] = useState("");
    const [ tempSubUser, setTempSubUser ] = useState(users[0].accountID);


    function _handleCreateSub() {
        // grab existing sub list
        const newSubs = subscriptions.splice(0);

        //TODO Refactor if possible, couldn't get the types to match up
        let intermedSubType: ESubscriptionType;
        if (tempSubType === "Coal") {
            intermedSubType = ESubscriptionType.ECoal;
        } else if (tempSubType === "Bronze") {
            intermedSubType = ESubscriptionType.EBronze;
        } else if (tempSubType === "Bronze") {
            intermedSubType = ESubscriptionType.ESilver;
        } else if (tempSubType === "Bronze") {
            intermedSubType = ESubscriptionType.EGold;
        } else {
            intermedSubType = ESubscriptionType.EPlatinum;
        }

        // create new sub object
        const newSubscription: ISubscription = {
            subscriptionID: subIDCount,
            subscriptionType: intermedSubType,
            licensePlate: tempLPNum,
            subscriptionOwner: tempSubUser,
            isActive: true,
            startDate: new Date(), 
        }
        // append to end of list
        newSubs.push(newSubscription);
        
        // update list
        changeSubscriptions(newSubs);

        // increment subIDCount
        changeSubIDCount(subIDCount + 1);

        // navigate to sub List view
        navigator.navigate("Subscriptions");
    }

    return (
        <View
            style={{
            flex: 1,
            height: '100%',
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "cadetblue"
        }}
        >
            <View style={{
                        flex: 3,
                        padding: 4,
                        borderRadius: 6,
                        backgroundColor: "darkcyan",
                        minWidth: '40%',
                        justifyContent: 'space-evenly',
                        flexDirection: "column",
                        alignItems: "center",
                        shadowRadius: 6,
                        shadowColor: '#111',
                        shadowOffset: {width: -2, height: 2},
                        margin: 6,
                        paddingLeft: 10,
                        marginTop: 20,
                        
                    }}>

                    
            <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontWeight: "bold", fontSize: 45}}>Add Subscription</Text>
            <View style={{
                    flex: 1,
                    maxHeight: '70%',
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start",
                    backgroundColor: "cadetblue",
                    shadowRadius: 6,
                    shadowColor: '#111',
                    shadowOffset: {width: -2, height: 2},
                    minWidth: '90%',
                    margin: 4,
                    paddingLeft: 25,
                }}>
                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Subscription ID: " + subIDCount}</Text>
            
            <View style={{flexDirection: "row"}}>
                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>Subscribed User: </Text>
                <select onChange={(e) => setTempSubUser(parseInt(e.target.value))}>
                    {users.filter((user) => user.isActive).map((user) => {
                        return (
                            <option value={user.accountID as number}>{user.userName}</option>
                        )
                    })}
                </select>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>Subscription Plan: </Text>
                <select onChange={(e) => setTempSubType(e.target.value)}>
                    {Object.values(ESubscriptionType).map((subType) => {
                        return (
                            <option value={subType}>{subType}</option>
                        )
                    })}
                </select>
            </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>Linked Vehicle License Plate Number: </Text>
                    <input onChange={(e) => setTempLPNum(e.target.value)}></input>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontSize: 20}}>{"Start Date: " + Date().substring(4, 15)}</Text>
                </View>
                </View>
            </View>
            <View
                style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}
            >
                <PatButton use={EButtonUse.Confirm} text="Create Subscription" pushed={() => _handleCreateSub()}></PatButton>
                <PatButton use={EButtonUse.Reject} text="Cancel Subscription Creation" pushed={() => navigator.navigate("Subscriptions")}></PatButton>
            </View>
        </View>
    )


}