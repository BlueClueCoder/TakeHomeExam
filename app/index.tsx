import { useNavigation } from "expo-router";
import { useContext } from "react";
import { Image, Text, View } from "react-native";
import { EButtonUse, PatButton } from "./components/PatButton";
import { UserSubscriptionContext } from "./contexts/UserSubscriptionContext";

export default function Index() {
  const UserSubscriptionInfo = useContext(UserSubscriptionContext);
  const navigator = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        height: '100%',
      }}
    >
      <View style={{flex: 1}}>
        <Text>This is the Home.</Text>
      </View>
       <View style={{flex: 8}}>
        <Image source={require('@/assets/images/homescreen.jpg')} style={{resizeMode: "cover", height: '70%'}}></Image>
        <PatButton use={EButtonUse.Navigate} text="View Users" pushed={() => navigator.navigate("Users")}></PatButton>
        <PatButton use={EButtonUse.Navigate} text="View Subscriptions" pushed={() => navigator.navigate("Subscriptions")}></PatButton>
      </View>

     

      <View style={{flex: 1}}>
        
      </View>

    </View>
  );
}
