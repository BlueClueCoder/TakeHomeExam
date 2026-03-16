import { useNavigation } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";
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
        <View>
            <Text> This is the User List Page. </Text>
            <View style={{flexDirection: "row"}}>
                <Text>Account ID</Text>
                <Text>User Name</Text>
                <Text>Email</Text>
                <Text>Phone Number</Text>
                <Text>Start Date</Text>
                <Text>View User?</Text>   
            </View>
            {UserSubscriptionInfo.users.map((value) => {
                if (!value.isActive) return;
                return (
                    <View style={{flexDirection: "row"}}>
                        <Text>{value.accountID}</Text>
                        <Text>{value.userName}</Text>
                        <Text>{value.email}</Text>
                        <Text>{value.phoneNumber}</Text>
                        <Text>{value.startDate.toString()}</Text>
                        <PatButton use={EButtonUse.Info} text="View Specific User" pushed={() => _navigateToUser(value.accountID)}></PatButton>
                    </View>
                )
            })}
            {UserSubscriptionInfo.users.length === 0 &&
                <Text>No Users Currently In System</Text>
            }
            <PatButton use={EButtonUse.Navigate} text="Return Home" pushed={() => navigator.navigate("Home")}></PatButton>
        </View>
    )
}