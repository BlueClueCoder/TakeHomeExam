import { useNavigation } from "expo-router";
import { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { EButtonUse, PatButton } from "../components/PatButton";
import { UserSubscriptionContext } from "../contexts/UserSubscriptionContext";

export default function UserListView()
{
    const UserSubscriptionInfo = useContext(UserSubscriptionContext);
    const navigator = useNavigation();

    function _navigateToUser(accountID: number) {
        // set a state to accountID value
        UserSubscriptionInfo.changeSelectedUser(accountID);
        // then navigate to that page, using the accountID value to populate
        navigator.navigate("Edit User");
    }

    return (
        <View
            style={{
                backgroundColor: '#DC6D49',
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <View style={{
                    backgroundColor: '#F19272',
                    flex: 7,
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxHeight: '70%',
                    borderRadius: 5,
                    minWidth: '50%',
                    marginTop: '5%',
                }}>
            <View
                    style={{
                        backgroundColor: '#F25C54',
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
                    <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontWeight: "bold", fontSize: 40}}>User Accounts</Text>
                </View>
            <ScrollView style={{
                                flexDirection: "column",
                                flex: 3,
                                backgroundColor: '#DC6D49',
                                maxHeight: '100%',
                                marginBottom: 10,
                                marginTop: 10,
                                minWidth: '95%',
                                maxWidth: '95%',
                            }}>
                    
            {UserSubscriptionInfo.users.map((value) => {
                if (!value.isActive) return;
                return (
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 7, borderColor: '#F19272', borderBottomWidth: 2,}}>
                        <Text style={{color: '#111', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontSize: 16}}>{"Account ID: " + value.accountID}</Text>
                        <Text style={{color: '#111', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontSize: 16}}>{"Username: " + value.userName}</Text>
                        <Text style={{color: '#111', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontSize: 16}}>{"Email: " + value.email}</Text>
                        <Text style={{color: '#111', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontSize: 16}}>{"Phone Number: " + value.phoneNumber}</Text>
                        <Text style={{color: '#111', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontSize: 16}}>{"Start Date: " + value.startDate.toString().substring(4, 15)}</Text>
                        <PatButton use={EButtonUse.Reject} text="View" pushed={() => _navigateToUser(value.accountID)}></PatButton>
                    </View>
                )
            })}
            {UserSubscriptionInfo.users.length === 0 &&
                <Text>No Users Currently In System</Text>
            }
            </ScrollView>
            </View>
            <View
                style={{
                    flex: 1,
                    marginTop: 10,
                }}
            >
            <PatButton use={EButtonUse.Navigate} text="Return Home" pushed={() => navigator.navigate("Home")}></PatButton>
            </View>
        </View>
    )
}