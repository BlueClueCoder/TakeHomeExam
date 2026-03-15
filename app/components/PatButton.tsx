import { Pressable, Text, View } from "react-native";

export enum EButtonUse {
    Confirm = "confirm",
    Reject = "reject",
    Navigate = "navigate",
    Info = "info",

}

interface IButtonProps {
    use: EButtonUse,
    text: string,
    pushed: () => void,
}


export function PatButton({use, text, pushed}: IButtonProps) {
    const buttonStyle = createStyle(use);

    return(
        <Pressable onPress={()=>pushed()}>
            <View style={buttonStyle}>
                <Text style={{color: "white", fontSize: 18, userSelect: "none"}}>{text}</Text>
            </View>
        </Pressable>
    )
}

function createStyle(use: EButtonUse) {
    switch (use) {
        case EButtonUse.Confirm: 
            return {
                borderRadius: 3,
                backgroundColor: "green",
                padding: 4,
                margin: 3,
                minWidth: 60,
                flexDirection: "row",
                justifyContent: "center",
                shadowRadius: 3,
            }
        case EButtonUse.Navigate: 
            return {
                borderRadius: 3,
                backgroundColor: "darkcyan",
                paddingHorizontal: 7,
                paddingVertical: 5,
                margin: 4,
                minWidth: 60,
                flexDirection: "row",
                justifyContent: "center",
                shadowRadius: 3,
            }

    }
}