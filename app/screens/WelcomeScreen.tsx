import React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {Colors} from "../colors";
import LogoText from "../components/logo/LogoText";
import Logo from "../components/logo/Logo";
import GoogleIcon from "../components/icons/GoogleIcon";
import AppleIcon from "../components/icons/AppleIcon";
import {ScrollView} from "react-native-gesture-handler";
import ClickButton from "../components/input/button/ClickButton";
import Navigation from "../../Navigation";

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
            <TouchableOpacity style={styles.signInButtonContainer}>
                <View style={styles.signInButton}>
                    <GoogleIcon width={20} height={20} />
                    <Text style={styles.signInButtonText}>Sign in with Google</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInButtonContainer}>
                <View style={styles.signInButton}>
                    <AppleIcon width="28" height="28" />
                    <Text style={styles.signInButtonText}>Sign in with Apple</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.accountButtonContainer}>
                <ClickButton onPress={() => navigation.navigate('Login')} title="Create an account"></ClickButton>
            </View>

            <View style={styles.accountTextContainer}>
                <Text style={{fontWeight: "400", color: Colors.primary}}>
                    You already have an account?
                </Text>
                <TouchableOpacity>
                    <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
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
    icons: {
        marginRight: 10,
    },
    signInButtonContainer: {
        width: 350,
        marginHorizontal: 50,
        marginVertical: 10,
        marginBottom: 30,
    },
    signInButton: {
        backgroundColor: Colors.white,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.primaryDark,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    signInButtonText: {
        color: Colors.textLight,
        textAlign: "center",
        marginLeft: 10,
        fontSize: 15,
    },
    accountButtonContainer: {
        width: 350,
        marginHorizontal: 50,
        marginVertical: 10,
        marginBottom: 30,
    },

    accountTextContainer: {
        flexDirection: "row",
    },
    linkText: {
        color: Colors.primary,
        marginLeft: 5,
        fontWeight: "bold",
    },
});

export default WelcomeScreen;

