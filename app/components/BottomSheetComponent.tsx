import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {Avatar, Text} from 'react-native-paper';
import {Colors} from '../colors';
import FormSubmitButton from './input/button/FormSubmitButton';
import Form from './form/Form';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FormItemPicker from './input/item_picker/FormItemPicker';
import * as YUP from "yup";
import CardPicker from './input/card_picker/CardPicker';
import ClickButton from './input/button/ClickButton';
import ImageSelector from './input/image_selector/ImageSelector';

interface BottomSheetComponentProps {
    enablePanDownToClose?: boolean
}


const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({enablePanDownToClose}) => {

    const validationSchemer = YUP.object().shape({
        time: YUP.string().label("time").required(),
    });

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
    const bottomSheetRef = useRef<BottomSheet>(null);


    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '75%', "90%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <View style={styles.container}>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={enablePanDownToClose}
                >
                    <View style={styles.contentContainer}>
                        <View style={styles.heading}>
                            <Text style={styles.bookText} >Book a walk</Text>
                            <Text style={styles.selectText}>Select a pet</Text>
                        </View>

                        <View style={styles.petProfile}>
                            <ImageSelector
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

                        <Form
                            initialValue={{
                                time: "",
                            }}
                            onSubmit={(value) => {
                                console.log(value);
                            }}
                            validationSchema={validationSchemer}>
                            <View>
                                <CardPicker
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
                                <ClickButton mode='contained' title='Schedule' onPress={() => console.log('Pressed')} />
                                <View style={styles.space} />
                                <FormSubmitButton mode='contained' title='Book now' />
                            </View>
                        </Form>
                        <View style={styles.agreeText}>
                            <Text style={styles.selectText}> By Proceeding you agree to the </Text>
                            <TouchableOpacity>
                                <Text style={styles.linkText}>Pawpal Service T&Cs</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </BottomSheet>
            </View >
        </GestureHandlerRootView >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    heading: {
        alignItems: "flex-start",
        marginBottom: 10,
    },
    space: {
        width: 10
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

export default BottomSheetComponent