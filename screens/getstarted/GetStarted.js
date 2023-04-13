import {View} from "native-base";
import {useEffect} from "react";
import {Dimensions, ImageBackground} from "react-native";
import AccentButton from "../../constants/AccentButton";
import {reuseStyle} from "../../constants/ReuseStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function GetStarted(props) {

    useEffect(() => {
        AsyncStorage.getItem("getStartedFlag").then((result) => {
            if (result === 'completed') {
                props.navigation.replace('Login')
            }
        })
    }, [])

    return <ImageBackground source={require('../../assets/get_started_bg.png')}
                            style={reuseStyle.staticBackgroundImage}>
        <View alignItems={"center"} top={Dimensions.get("window").height - 100}>
            <AccentButton name={"Get Started"} onPress={() => {
                AsyncStorage.setItem("getStartedFlag", "completed")
                    .then(() => {
                            props.navigation.replace('Login')
                        }
                    )
            }}/>
        </View>
    </ImageBackground>
}