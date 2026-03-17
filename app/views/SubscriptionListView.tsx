import { useNavigation } from "expo-router";
import { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
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
        <View
            style={{
                backgroundColor: '#5F58DA',
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <View
                style={{
                    backgroundColor: '#7E79DF',
                    flex: 7,
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxHeight: '70%',
                    borderRadius: 5,
                    minWidth: '50%',
                    marginTop: '5%',
                }}
            >
                <View
                    style={{
                        backgroundColor: '#3E3AA0',
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8,
                        shadowRadius: 6,
                        shadowColor: '#111',
                        shadowOffset: {width: -2, height: 2},
                        minWidth: '50%',
                        maxHeight: '10%',
                        marginTop: 10,
                    }}
                >
                    <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontWeight: "bold", fontSize: 40}}>Subscriptions</Text>
                </View>
                <ScrollView style={{
                    flexDirection: "column",
                    flex: 3,
                    backgroundColor: '#5F58DA',
                    maxHeight: '100%',
                    marginBottom: 10,
                    marginTop: 10,
                    minWidth: '95%',
                }}>
                {UserSubscriptionInfo.subscriptions.map((value) => {
                    if (!value.isActive) return;
                    return (
                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 7, borderColor: '#7E79DF', borderBottomWidth: 2,}}>
                            <Text style={{color: '#111', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontSize: 16}}>{"Sub ID: " + value.subscriptionID}</Text>
                            <Text style={{color: '#111', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontSize: 16}}>{"Owner: " + UserSubscriptionInfo.users.find((user) => user.accountID === value.subscriptionOwner)?.userName}</Text>
                            <Text style={{color: '#111', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontSize: 16}}>{"License Plate: " + value.licensePlate}</Text>
                            <Text style={{color: '#111', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontSize: 16}}>{"Type: " + value.subscriptionType}</Text>
                            <Text style={{color: '#111', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontSize: 16}}>{"Start Date: " + value.startDate.toString().substring(4, 15)}</Text>
                            <PatButton use={EButtonUse.Info} text="View" pushed={() => _navigateToSubscription(value.subscriptionID)}></PatButton>
                        </View>
                    )
                })}
                {UserSubscriptionInfo.subscriptions.filter((sub) => sub.isActive).length < 1 &&
                    <Text>No subscriptions currently active</Text>
                }
                </ScrollView>
            </View>
            <View style={{
                flexDirection: "column",
                flex: 1,
                maxHeight: '100%',
                marginBottom: 10,
                marginTop: 10,
                maxWidth: '50%',
            }}>
                <PatButton use={EButtonUse.Confirm} text="Create Subscription" pushed={() => navigator.navigate("Add Subscription")}></PatButton>
                <PatButton use={EButtonUse.Navigate} text="Return Home" pushed={() => navigator.navigate("Home")}></PatButton>
            </View>
        </View>
    )
}