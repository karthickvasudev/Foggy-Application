import {useEffect, useState} from "react";

import {Dimensions, ImageBackground, Platform, StyleSheet, ToastAndroid} from "react-native";
import {GetProfileApi, LoginApi} from "../apihelper/AppApi";
import {Icon, Input, Pressable, View} from "native-base";
import {AppColor} from "../../constants/AppColor";
import {MaterialIcons} from "@expo/vector-icons";
import PrimaryButton from "../../constants/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../../constants/CustomTextInput";
import PasswordInputText from "../../constants/PasswordInputText";

export default function Login(props) {
    useEffect(() => {
        AsyncStorage.getItem("token")
            .then(token => {
                if (token !== null) {
                    profileHandle();
                }
            }).catch(err => {
            console.log("error")
        })
    })

    const profileHandle = () => {
        GetProfileApi().then(response => {
            if (response.status === 200) {
                return response.json()
            }
            throw new Error("error in profile api")
        }).then(response => {
            if (!response?.isProfileUpdated) {
                props.navigation.replace('Update Profile')
            } else {
                props.navigation.replace('HomePage')
            }
        }).catch(err => {
            AsyncStorage.removeItem("token").then()
        })
    }

    const loginHandler = (username, password) => {
        console.log(username, password)
        LoginApi({username: username, password: password})
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw new Error("Invalid Username or Password")
            }).then(response => {
            console.log(response?.token)
            AsyncStorage.setItem("token", response?.token)
                .then(() => {
                    profileHandle()
                })
        }).catch(err => {
            ToastAndroid.show(err.message, 5)
        })
    }
    const LogoPlaceHolder = () => {
        return <View w={200}
                     h={200}
                     mt={150}
                     borderColor={'black'}
                     borderWidth={2}
                     alignSelf={"center"}
                     backgroundColor={AppColor.accent}
        ></View>
    }

    const AdminLoginForm = () => {
        const [userName, setUserName] = useState("");
        const [password, setPassword] = useState("");

        return <View style={style.adminForm}>
            <View w={300} mt={5}>
                <CustomTextInput
                    inputType={'text'}
                    icon={{
                        name: "user"
                    }}
                    placeholder={"Username"}
                    onChange={e => setUserName(e.nativeEvent.text)}
                />
            </View>
            <View w={300} mt={5}>
                <PasswordInputText
                    placeholder={"Password"}
                    onChange={e => setPassword(e.nativeEvent.text)}
                />
            </View>
            <View mt={5}>
                <PrimaryButton name={'Login'} onPress={() => loginHandler(userName, password)}/>
            </View>
        </View>
    }
    return <ImageBackground source={require("../../assets/foggy_bg.png")} style={style.backgroundImage}>
        <View>
            <LogoPlaceHolder/>
            <AdminLoginForm/>
        </View>
    </ImageBackground>

}


const style = StyleSheet.create({
    backgroundImage: {
        backgroundColor: AppColor.accent,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    adminForm: {
        alignItems: "center",
        marginTop: 10,
    }, container: {
        flex: 1,
    }
})