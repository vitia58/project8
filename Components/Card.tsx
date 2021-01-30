import React from 'react';
import {StyleSheet, View} from 'react-native';
export const Card = ({
  onTouchStart,
  onTouchEnd,
  children,
}: {
  onTouchStart: any;
  onTouchEnd: any;
  children: any;
}) => {
  return (
    <View
      style={styles.card}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
