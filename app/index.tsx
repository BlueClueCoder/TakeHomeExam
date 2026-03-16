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
      <View style={{flex: 1, backgroundColor: '#3E3AA0', justifyContent: "center", flexDirection: "row", alignItems: "center"}}>
        <Text style={{color: '#fff8dc', fontFamily: "sans-serif-condensed", fontStyle: "italic", fontWeight: "bold", fontSize: 60}}>BubbleBay Car Washes</Text>
      </View>
      <div style={{backgroundColor: "lightcoral", height: 4}}></div>
       <View style={{flex: 8, justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
        <Image source={require('@/assets/images/homescreen.jpg')} style={{resizeMode: "cover", height: '100%'}}></Image>
      </View>
      <div style={{backgroundColor: "lightcoral", height: 4}}></div>
      <View style={{flex: 1, backgroundColor: '#3E3AA0', justifyContent: "space-around", flexDirection: "row", alignItems: "center"}}>
        <PatButton use={EButtonUse.Navigate} text="View Users" pushed={() => navigator.navigate("Users")}></PatButton>
        <PatButton use={EButtonUse.Navigate} text="View Subscriptions" pushed={() => navigator.navigate("Subscriptions")}></PatButton>
      </View>
    </View>
  );
}
