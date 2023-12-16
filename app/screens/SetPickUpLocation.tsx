import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import Form from '../components/form/Form';
import FormSubmitButton from '../components/input/button/FormSubmitButton';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import {Colors} from '../colors';
import LocationPicker from '../components/maps/location_picker/LocationPicker';
import ScreenRoutes from '../../ScreenRoutes';
import ClickButton from '../components/input/button/ClickButton';

interface SetPickUpLocationProps {
    navigation: any
}


const SetPickUpLocation: React.FC<SetPickUpLocationProps> = ({navigation}) => {
    const [petPickupLoc, setPetPickupLocation] = useState({
        latitude: 60.1100964,
        longitude: 24.6890503,
    });
    return (
        <View style={styles.container}>
            <LocationPicker
                location={petPickupLoc as any}
                onLocationChange={setPetPickupLocation as any}
                calloutTitle="Pet Pickup Location"
                descriptionExtractor={(markerLocation) =>
                    `Latitude: ${markerLocation.latitude}, Longitude: ${markerLocation.longitude}`
                }
                confirmDialogueMessageExtractor={(markerLocation) =>
                    `Are you sure you want to select Latitude:${markerLocation.latitude}, Longitude: ${markerLocation.longitude} as pet pickup location?`
                }
            />
            <View style={styles.bottomContainer}>
                <Card style={styles.card}>
                    <Card.Title
                        title="Alippila crossroad"
                        subtitle="Apt No. 420, Suintionkatu Rd, Alppila"
                        left={(props) => <MaterialCommunityIcons name='home-map-marker' color={Colors.primaryDark} {...props} />}
                    />
                    {/* <Form
                        onSubmit={(value) => {
                            console.log(value);
                        }}
                    >
                        <View style={styles.confirmButton}>
                            <FormSubmitButton mode='contained' title='Confirm pick up address' />
                        </View>
                    </Form> */}

                    <View style={styles.confirmButton}>
                        <ClickButton mode='contained' title='Confirm pick up address' onPress={() => {navigation.navigate(ScreenRoutes.CONFIRM_BOOKING)}}/>
                    </View>
                </Card>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    card: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardActions: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "green"
    },
    confirmButton: {
        padding: 20,
    },

});

export default SetPickUpLocation;
