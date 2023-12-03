import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
} from "react-native";
import {Colors} from "../colors";
import LogoText from "../components/logo/LogoText";
import ClickButton from "../components/input/button/ClickButton";

interface AccountVerifyScreenProps {
    navigation: any
}

const AccountVerifyScreen: React.FC<AccountVerifyScreenProps> = ({navigation}) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logo}>
                <LogoText width={150} height={150} />
            </View>
            <View>
                <Image
                    source={require("../assets/profile_picture.jpg")}
                    style={styles.profileImage}
                />
            </View>
            <View>
                <Text style={styles.nameText}>Hi Walter,</Text>
                <Text style={styles.verifyText}>
                    We have sent a verification link to your email address. Please verify
                    your account to continue.
                </Text>
            </View>
            <View style={styles.resendButtonContainer}>
                <ClickButton mode="contained" onPress={() => navigation.navigate('Pet Registration')} title="Resend link"></ClickButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
        padding: 20
    },
    logo: {
        alignItems: "center"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: "center",
    },
    nameText: {
        padding: 20,
        fontSize: 25,
        color: Colors.textDark,
        fontWeight: "600",
        textAlign: "center",
    },
    verifyText: {
        padding: 50,
        fontSize: 20,
        color: Colors.textDark,
        textAlign: "center",
    },
    resendButtonContainer: {
        alignItems: "center",
    }
});

export default AccountVerifyScreen;
