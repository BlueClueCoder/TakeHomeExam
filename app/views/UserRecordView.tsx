import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function UserRecordView()
{
    return (
        <View>
            <Text> This is the User Record Page. </Text>
            <Link href="/views/UserListView">Return to Users List</Link>
            <Link href="../..">Return Home</Link>
        </View>
    )
}