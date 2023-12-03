import React, {useState} from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
} from "react-native";
import {Colors} from "../colors";
import LogoText from "../components/logo/LogoText";
import FormTextInput from "../components/input/text_input/FormTextInput";
import * as YUP from "yup";
import Form from "../components/form/Form";
import FormSubmitButton from "../components/input/button/FormSubmitButton";
import FormChipSelector from "../components/input/chip_selector/FormChipSelector";
import {Avatar, IconButton} from "react-native-paper";
import FormItemPicker from "../components/input/item_picker/FormItemPicker";
import {FlatList} from "react-native-gesture-handler";

interface PetInfoScreenProps {
    navigation: any
}

const PetInfoScreen: React.FC<PetInfoScreenProps> = ({navigation}) => {

    const validationSchemer = YUP.object().shape({
        sex: YUP.string().label("sex").required(),
        size: YUP.string().label("size").required(),
        chip: YUP.array().of(YUP.string()).label("chip").required(),

    });

    const sex = [
        {id: 1, name: "Male"},
        {id: 2, name: "Female"}
    ];

    const size = [
        {id: 1, name: "Small"},
        {id: 2, name: "Medium"},
        {id: 3, name: "Large"}
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Form initialValue={{
                    sex: "",
                    size: "",
                    chip: "",
                }}
                    onSubmit={(value) => {
                        console.log(value);
                    }}
                    validationSchema={validationSchemer}
                >
                    <View style={styles.logo}>
                        <LogoText width="100%" height={30} />
                    </View>

                    <View style={styles.heading}>
                        <Avatar.Image size={150} source={require('../assets/pet_profile.jpg')} />
                        <Text style={styles.text}>Please select the words that describe your pet</Text>
                    </View>

                    <View>
                        <Text style={styles.setText}>Milo 2 yrs</Text>
                    </View>

                    <View style={styles.chips}>
                        <FormChipSelector name="chip" icon="check" mode="outlined" options={["Potty trained", "Vaccinated", "Shy", "Fiesty", "Friendly", "Trained", "Neutered"]} />
                    </View>

                    <View style={styles.itemPicker}>
                        <FormItemPicker
                            name="sex"
                            variant="outlined"
                            label="Sex"
                            data={sex}
                            valueExtractor={(item) => item?.id}
                            labelExtractor={(item) => `${item?.name}`}
                            surfixIcon="chevron-down"
                            renderItem={({item, index, separators}) => (
                                <View style={{alignItems: "center", margin: 5, backgroundColor: Colors.lightGray, flexDirection: "row", borderRadius: 10}}>
                                    <IconButton icon={item.icon} />
                                    <Text style={{}}>{item.name}</Text>
                                    <Text style={{}}>{item.label}</Text>
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.itemPicker}>
                        <FormItemPicker
                            name="size"
                            variant="outlined"
                            label="Size"
                            data={size}
                            valueExtractor={(item) => item?.id}
                            labelExtractor={(item) => `${item?.name}`}
                            surfixIcon="chevron-down"
                            renderItem={({item, index, separators}) => (
                                <View style={{alignItems: "center", margin: 5, backgroundColor: Colors.lightGray, flexDirection: "row", borderRadius: 10}}>
                                    <IconButton icon={item.icon} />
                                    <Text style={{}}>{item.name}</Text>
                                    <Text style={{}}>{item.label}</Text>
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.doneButton} >
                        <FormSubmitButton mode="contained" title="All Done" onPress={() => navigation.navigate('Home')} />
                    </View>

                </Form>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: Colors.white,
        padding: 20,
    },
    logo: {
        alignItems: "center",
        padding: 20

    },
    heading: {
        alignItems: "center",
        padding: 20,
    },
    text: {
        color: Colors.neutralDark,
        padding: 10,
    },
    setText: {
        fontSize: 30,
        color: Colors.textDark,
        fontWeight: "600",
        textAlign: "center",
    },
    chips: {
        alignItems: "center",
        padding: 20,
        marginBottom: 10,
    },
    itemPicker: {
        padding: 10

    },
    inputs: {
        marginBottom: 10,
    },
    doneButton: {
        marginTop: 40,
        alignSelf: "center",
    },
});

export default PetInfoScreen;
