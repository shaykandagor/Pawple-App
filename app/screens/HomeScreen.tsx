import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import {Colors} from "../colors";
import LogoText from "../components/logo/LogoText";
import CustomCard from "../components/display/CustomCard";
import ClickButton from "../components/input/button/ClickButton";
import {Avatar} from "react-native-paper";
import {BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal} from '@gorhom/bottom-sheet';
import Form from "../components/form/Form";
import FormSubmitButton from "../components/input/button/FormSubmitButton";
import * as YUP from "yup";
import ScreenRoutes from "../../ScreenRoutes";
import FormCardPicker from "../components/input/card_picker/FormCardPicker";
import FormImageSelector from "../components/input/image_selector/FormImageSelector";

interface HomeScreenProps {
    navigation: any
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {

    const durations = [
        {id: 1, name: "20 minutes", cost: "7.00£"},
        {id: 2, name: "30 minutes", cost: "8.00£", subTitle: "Popular"},
        {id: 3, name: "45 minutes", cost: "10.00£"},
        {id: 4, name: "1 hour", cost: "12.00£"},
    ];



    const avatars = [
        {id: 1, url: 'https://picsum.photos/id/237/200/300'},
        {id: 2, url: 'https://picsum.photos/id/237/200/300'},
    ];

    const [time, setTime] = useState(1)
    const [selectedAvatar, setSelectedAvatar] = useState(1);

    // ref
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const {dismiss} = useBottomSheetModal();

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        setShowSheet(!showSheet)
        bottomSheetRef.current?.present();
    }, []);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );

    const [showSheet, setShowSheet] = useState(false)

    const validationSchemer = YUP.object().shape({
        time: YUP.string().label("time").required(),
        pet: YUP.string().label("pet").required(),
    });


    return (
        <View style={styles.container}>

            <View>
                <View style={styles.headingHome}>
                    <LogoText width="100%" height={30} />
                </View>

                <View>
                    <Text style={styles.text}>Your Pets</Text>
                </View>

                <View style={styles.petProfileHome}>
                    <Avatar.Image size={100} source={require('../assets/pet_profile.jpg')} />
                    <View style={styles.space} />
                    <Avatar.Icon icon="plus" size={100} style={{backgroundColor: Colors.lightGray}} />
                </View>

                <View style={{alignSelf: "flex-start"}}>
                    <Text style={styles.text}>Community Events</Text>
                </View>
            </View>

            <ScrollView >
                <View style={styles.cardContainer}>
                    <CustomCard
                        title="Hakaniemi Group Walk"
                        subTitle="Oct 24 at 6:00 pm"
                        mode="contained"
                        image={"https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    />
                    <CustomCard
                        title="Hakaniemi Group Walk"
                        subTitle="Oct 24 at 6:00 pm"
                        mode="contained"
                        image={"https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    />
                    <CustomCard
                        title="Hakaniemi Group Walk"
                        subTitle="Oct 24 at 6:00 pm"
                        mode="contained"
                        image={"https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    />
                    <CustomCard
                        title="Hakaniemi Group Walk"
                        subTitle="Oct 24 at 6:00 pm"
                        mode="contained"
                        image={"https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    />
                </View>
            </ScrollView>
            <View style={styles.bookButton} >
                <ClickButton icon="dog" mode="contained" onPress={handlePresentModalPress} title="Book a walk" ></ClickButton>
            </View>

            {showSheet &&
                <BottomSheetModal
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={['85%', '50%', '25%']}
                    enablePanDownToClose={true}
                    backdropComponent={renderBackdrop}
                >
                    <View style={styles.contentContainer}>
                        <View style={styles.heading}>
                            <Text style={styles.bookText} >Book a walk</Text>
                            <Text style={styles.selectText}>Select a pet</Text>
                        </View>

                        <Form
                            initialValue={{
                                time: "",
                                pet: "",
                            }}
                            onSubmit={(value) => {
                                console.log(value);
                                setShowSheet(!showSheet)
                                navigation.navigate(ScreenRoutes.SET_PICKUP_LOCATION)
                            }}
                            validationSchema={validationSchemer}>

                            <View style={styles.petProfile}>
                                <FormImageSelector
                                    name="pet"
                                    items={avatars}
                                    value={selectedAvatar}
                                    valueExtractor={(avatar) => avatar.id}
                                    onValueChange={setSelectedAvatar}
                                    imageExtractor={(avatar) => avatar.url}
                                />
                            </View>

                            <View style={styles.heading} >
                                <Text style={styles.selectText}>Select duration</Text>
                            </View>

                            <View>
                                <FormCardPicker
                                    name="time"
                                    value={time}
                                    items={durations}
                                    titleExtractor={(duration) => duration.name}
                                    valueExtractor={(duration) => duration.id}
                                    subTitleExtractor={(duration) => duration.subTitle}
                                    renderTrailer={(duration, props) => <Text style={styles.cardText}>{duration.cost}</Text>}
                                    onValueChange={setTime}
                                />
                            </View>
                            <View style={styles.bookButtons}>
                                <View style={{flex: 1, marginRight: 10}}>
                                    <ClickButton mode='outlined' title='Schedule' onPress={() => console.log('Pressed')} />
                                </View>

                                <View style={{flex: 2}} >
                                    <FormSubmitButton mode='contained' title='Book now' />
                                </View>

                            </View>
                        </Form>
                        <View style={styles.agreeText}>
                            <Text style={styles.selectText}> By Proceeding you agree to the </Text>
                            <TouchableOpacity>
                                <Text style={styles.linkText}>Pawpal Service T&Cs</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BottomSheetModal>

            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20,
    },
    contentContainer: {
        padding: 20,
    },
    headingHome: {
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        color: Colors.textDark,
        paddingVertical: 10,
    },
    petProfileHome: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    space: {
        width: 10,
    },
    bookButton: {
        alignSelf: "center",
        padding: 20,
        position: "absolute",
        bottom: 20,
        zIndex: 1,
    },
    cardContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,

    },
    heading: {
        alignItems: "flex-start",
        marginBottom: 10,
    },
    bookText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.textDark,
        paddingBottom: 15,
    },
    selectText: {
        fontSize: 14,
        color: Colors.textLight,
    },
    petProfile: {
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 10,
    },
    bookButtons: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,

    },
    agreeText: {
        flexDirection: "row",
        paddingTop: 20,
    },
    linkText: {
        color: Colors.primary,
        marginLeft: 5,
        fontWeight: "bold",

    },
    cardText: {
        fontSize: 15,
        color: Colors.textGray
    }
});

export default HomeScreen;
