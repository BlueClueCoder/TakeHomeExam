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

// TODO fix buttons expanding to take up entire space

export function PatButton({use, text, pushed}: IButtonProps) {
    const buttonStyle = createStyle(use);

    return(
        <Pressable onPress={()=>pushed()}>
            <View style={buttonStyle}>
                <Text style={{color: "white", fontSize: 18, userSelect: "none", fontFamily: "sans-serif-condensed"}}>{text}</Text>
            </View>
        </Pressable>
    )
}

function createStyle(use: EButtonUse) {
    switch (use) {
        case EButtonUse.Confirm: 
            return {
                borderRadius: 3,
                backgroundColor: '#F4845F',
                padding: 4,
                margin: 3,
                minWidth: 60,
                flexDirection: "row",
                justifyContent: "center",
                shadowRadius: 6,
                shadowColor: '#111',
                shadowOffset: {width: -2, height: 2},
                maxWidth: 200,
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
                shadowRadius: 6,
                shadowColor: '#111',
                shadowOffset: {width: -2, height: 2},
            }
        case EButtonUse.Reject: 
            return {
                borderRadius: 3,
                backgroundColor: '#F25C54',
                paddingHorizontal: 7,
                paddingVertical: 5,
                margin: 4,
                minWidth: 60,
                flexDirection: "row",
                justifyContent: "center",
                shadowRadius: 6,
                shadowColor: '#111',
                shadowOffset: {width: -2, height: 2},
                maxWidth: 300,
            }
        case EButtonUse.Info: 
            return {
                borderRadius: 3,
                backgroundColor: '#3E3AA0',
                paddingHorizontal: 7,
                paddingVertical: 5,
                margin: 4,
                minWidth: 60,
                flexDirection: "row",
                justifyContent: "center",
                shadowRadius: 6,
                shadowColor: '#111',
                shadowOffset: {width: -2, height: 2},
                maxWidth: 200,
            }

    }
}