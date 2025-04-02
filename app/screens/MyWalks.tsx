import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import ClickButton from '@components/input/button/ClickButton';
import { Colors } from '@util';
import { WALK_BOOKING } from './ScreenNames';

const MyWalks = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ClickButton
        icon="dog"
        mode="contained"
        title="Book a Walk"
        onPress={() => navigation.navigate(WALK_BOOKING as never)}
        style={styles.floatingButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default MyWalks;