import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
} from "react-native";
import {Colors} from "../colors";
import LogoText from "../components/logo/LogoText";

const AccountVerifyScreen: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileImageContainer}>
                <LogoText width={200} height={200} />
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
                <TouchableOpacity style={styles.resendLink}>
                    <View style={styles.resendButton}>
                        <Text style={{fontWeight: "bold", color: Colors.white}}>
                            Resend Link
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.white,
        padding: 40,
    },
    profileImageContainer: {
        padding: 15,
        alignItems: "center",
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: "center",
    },
    nameText: {
        padding: 40,
        fontSize: 25,
        color: Colors.textDark,
        fontWeight: "600",
        textAlign: "center",
    },
    verifyText: {
        padding: 40,
        fontSize: 16,
        color: Colors.textDark,
        fontWeight: "500",
        textAlign: "center",
    },
    resendButtonContainer: {
        flex: 1,
        alignItems: "center",
        padding: 20,
    },
    resendLink: {
        width: 350,
        marginHorizontal: 50,
        marginVertical: 10,
    },
    resendButton: {
        backgroundColor: Colors.primary,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.primaryDark,
        padding: 10,
        alignItems: "center",
    },
});

export default AccountVerifyScreen;
