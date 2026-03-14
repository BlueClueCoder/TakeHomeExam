import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function UserListView()
{
    return (
        <View>
            <Text> This is the User List Page. </Text>
            <Link href="/views/UserRecordView">View Specific User</Link>
            <Link href="../..">Return Home</Link>
        </View>
    )
}