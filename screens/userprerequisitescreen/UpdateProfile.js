import {useEffect, useState} from "react";
import {GetProfileApi, UpdateOwnerProfile} from "../apihelper/AppApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View} from "native-base";
import CustomTextInput from "../../constants/CustomTextInput";
import PasswordInputText from "../../constants/PasswordInputText";
import PrimaryButton from "../../constants/PrimaryButton";

export default function UpdateProfile(props) {
    const [body, setBody] = useState()
    useEffect(() => {
        GetProfileApi().then(response => {
            if (response.status === 200) {
                return response.json();
            } else
                throw new Error('error in get profile')
        }).then(response => {
            if (response.isProfileUpdated) {
                props.navigation.navigate('HomePage')
            }
        }).catch(err => console.log(err))
    })
    const updateProfile = () => {
        UpdateOwnerProfile(body).then(response => {
            if (response.status === 200) {
                return response.json()
            }
            throw new Error("error in update profile")
        }).then(response => {
            if (response.isProfileUpdated) {
                props.navigation.replace('HomePage')
            }
            throw new Error("error in update")
        }).catch(reason => console.log(reason))
    }
    return <>
        <View alignItems={'center'} justifyContent={"center"} flex={1}>
            <View w={300} mt={4}>
                <CustomTextInput placeholder={"Name"}
                                 onChange={(e) => setBody({...body, name: e.nativeEvent.text})}/>
            </View>
            <View w={300} mt={4}>
                <PasswordInputText placeholder={"Password"}
                                   onChange={(e) => setBody({...body, password: e.nativeEvent.text})}/>
            </View>
            <View w={300} mt={4}>
                <PasswordInputText placeholder={"Confirm Password"}/>
            </View>
            <View mt={4}>
                <PrimaryButton name={"Update Profile"} onPress={updateProfile}/>
            </View>
        </View>
    </>
}