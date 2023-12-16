import React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Colors} from "../colors";
import LogoText from "../components/logo/LogoText";
import Logo from "../components/logo/Logo";
import GoogleIcon from "../components/icons/GoogleIcon";
import AppleIcon from "../components/icons/AppleIcon";
import ClickButton from "../components/input/button/ClickButton";
import ScreenRoutes from "../../ScreenRoutes";
import {MaterialCommunityIcons} from '@expo/vector-icons'

interface WelcomeScreenProps {
    navigation: any

}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Logo width={200} height={200} />
                <LogoText width={120} height={120} />
                <Text style={styles.slogan}>
                    Trustworthy pet walkers on demand. Tap, book, and enjoy stress-free
                    strolls provided by a friendly walker.
                </Text>
            </View>

            <View style={styles.signInButton}>
                <ClickButton icon="google" title="Sign in with Apple" mode="outlined" onPress={() => console.log("Pressed")} />
                <View style={styles.space} />
                <ClickButton icon="apple" title="Sign in with Apple" mode="outlined" onPress={() => console.log("Pressed")} />
                <View style={styles.space} />
                <ClickButton mode="contained" onPress={() => console.log("Pressed")} title="Create an account"></ClickButton>
            </View>

            <View style={styles.accountTextContainer}>
                <Text style={{fontWeight: "400", color: Colors.primary}}>
                    You already have an account?
                </Text>
                <TouchableOpacity>
                    <Text onPress={() => {navigation.navigate(ScreenRoutes.LOGIN)}} style={styles.linkText}>Login </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    logoContainer: {
        paddingTop: 20,
        alignItems: "center",
    },
    slogan: {
        padding: 20,
        fontSize: 16,
        color: Colors.textLight,
        textAlign: "center",
    },
    signInButton: {        
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    accountTextContainer: {
        padding: 40,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    linkText: {
        color: Colors.primary,
        marginLeft: 5,
        fontWeight: "bold",
    },
    space: {
        height: 20
    }
});

export default WelcomeScreen;

