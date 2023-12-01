import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  UIManager,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import {IconButton, Text} from 'react-native-paper';
import {colors} from '../../constants/colors';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  show: boolean;
  children: React.ReactNode;
  close: () => void;
};

const BottomSheet = ({children, show, close = () => {}}: Props) => {
  return (
    <Modal
      isVisible={show}
      onBackdropPress={() => {
        close();
      }}
      onBackButtonPress={() => {
        close();
      }}
      useNativeDriverForBackdrop={true}
      onSwipeComplete={() => {
        close();
      }}
      swipeDirection="down"
      style={styles.modal}>
      <View
        style={[
          styles.bottomSheet,
          {borderTopRightRadius: 20, borderTopLeftRadius: 20},
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : undefined}>
          <View style={styles.indicator} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}>
            <Text variant="titleLarge">Sort By</Text>
            <IconButton
              icon="close"
              iconColor={colors.primary}
              size={20}
              onPress={() => {
                close();
              }}
            />
          </View>
          <View>{children}</View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
  },
  bottomSheet: {
    backgroundColor: colors.primaryContainer,
    width: '100%',
    paddingHorizontal: 24,
  },
  indicator: {
    borderBottomWidth: 5,
    width: 96,
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: colors.primary,
    marginVertical: 8,
  },
});

export default BottomSheet;
