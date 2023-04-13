import React, {useState} from 'react';
import {ScrollView, Select, View, VStack} from "native-base";
import PrimaryButton from "../../constants/PrimaryButton";
import CustomTextInput from "../../constants/CustomTextInput";
import {CreateEmployeeApi, LogoutHandler} from "../apihelper/AppApi";
import {Ionicons} from "@expo/vector-icons";
import {AppColor} from "../../constants/AppColor";
import {Dimensions} from "react-native";
import {useIsFocused} from "@react-navigation/native";

function CreateEmployee(props) {
    const resume = useIsFocused()
    const [selectedItem, setSelectedItem] = useState('')
    const [branches, setBranches] = useState([])
    const [body, setBody] = useState({
        name: "", email: "", phoneNumber: "", applicationRole: ""
    })

    const createEmployee = () => {
        CreateEmployeeApi(body).then(response => {
            if (response.status === 200) {
                return response.json()
            }
            LogoutHandler(response)
        }).then(r => {
            console.log(r)
            props.navigation.goBack()
        }).catch(err => {
            console.log(err)
        })
    }

    return <>
        <ScrollView>
            <VStack space={5} mt={5}>
                <View mx={10}>
                    <CustomTextInput placeholder={"Name"}
                                     onChange={e => setBody({...body, name: e.nativeEvent.text})}/>
                </View>
                <View mx={10}>
                    <CustomTextInput placeholder={"Email"}
                                     onChange={e => setBody({...body, email: e.nativeEvent.text})}/>
                </View>
                <View mx={10}>
                    <CustomTextInput placeholder={"Phone Number"}
                                     inputType={"numeric"}
                                     onChange={e => setBody({...body, phoneNumber: e.nativeEvent.text})}/>
                </View>
                <View mx={10}>
                    <Select w={Dimensions.get("window").width - 90}
                            selectedValue={selectedItem}
                            color={AppColor.primary}
                            borderBottomWidth={1}
                            borderRadius={10}
                            dropdownIcon={<Ionicons name="ios-caret-down" size={20} color={AppColor.primary}/>}
                            placeholder={"Choose Role"}
                            onValueChange={itemValue => {
                                setBody({...body, applicationRole: itemValue})
                                setSelectedItem(itemValue)
                            }}
                    >
                        {["EMPLOYEE", "MANAGER"].map((role, index) => <Select.Item key={index} label={role}
                                                                                   value={role}/>)}
                    </Select>
                </View>
                <View mx={10}>
                    <PrimaryButton name={"Create Employee"} onPress={createEmployee}/>
                </View>
            </VStack>
        </ScrollView>
    </>
}

export default CreateEmployee;