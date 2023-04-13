import {Dimensions, Platform, StatusBar, StyleSheet} from "react-native";
import {AppColor} from "./AppColor";

export const safeView = {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
}

export const defaultFlex = {
    flex: 1
}
export const raisedLook = {
    elevation: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5
}

export const reuseStyle = StyleSheet.create({
    staticBackgroundImage: {
        backgroundColor: AppColor.accent,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    stickyBottomButton: {
        position: 'absolute',
        width: Dimensions.get("screen").width,
        bottom: 0,
        backgroundColor: "transparent",
        zIndex: 100,
        alignItems: "center",
        justifyContent: "center"
    }
})
