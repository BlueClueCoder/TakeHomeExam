import { useNavigation } from "expo-router";
import { useContext, useState } from "react";
import { Button, Text, View } from "react-native";
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
        <View>
            <Text>This is the Add Subscription Page</Text>
            <View style={{flexDirection: "row"}}>
                <Text>{"Subscription ID: " + subIDCount}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text>Subscribed User: </Text>
                <select onChange={(e) => setTempSubUser(parseInt(e.target.value))}>
                    {users.filter((user) => user.isActive).map((user) => {
                        return (
                            <option value={user.accountID as number}>{user.userName}</option>
                        )
                    })}
                </select>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text>Subscription Plan: </Text>
                <select onChange={(e) => setTempSubType(e.target.value)}>
                    {Object.values(ESubscriptionType).map((subType) => {
                        return (
                            <option value={subType}>{subType}</option>
                        )
                    })}
                </select>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text>Subscribed Vehicle License Plate Number: </Text>
                <input onChange={(e) => setTempLPNum(e.target.value)}></input>
            </View>
            <View style={{flexDirection: "row"}}>
                <Text>{"Start Date: " + Date()}</Text>
            </View>
            <Button title="Create Subscription" onPress={() => _handleCreateSub()}></Button>
            <Button title="Cancel Subscription Creation" onPress={() => navigator.navigate("Subscriptions")}></Button>

        </View>
    )


}