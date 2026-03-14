import { useNavigation } from "expo-router";
import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { UserSubscriptionContext } from "../contexts/UserSubscriptionContext";

export default function UserRecordView()
{
    const UserSubscriptionInfo = useContext(UserSubscriptionContext);
    const chosenID: number | undefined = UserSubscriptionInfo.selectedUser;
    const userOfInterest = UserSubscriptionInfo.users.find(user => user.accountID === chosenID);
    const navigator = useNavigation();

    return (
        <View>
            <Text> This is the User Record Page. </Text>
            <Text>{chosenID}</Text>
            <Text>{userOfInterest?.userName}</Text>
            <Text>{userOfInterest?.email}</Text>
            <Text>{userOfInterest?.phoneNumber}</Text>
            <Text>{userOfInterest?.startDate.toString()}</Text>
            <Button title="Return to User List" onPress={() => navigator.navigate("Users")}></Button>
            <Button title="Return Home" onPress={() => navigator.navigate("Home")}></Button>
        </View>
    )
}