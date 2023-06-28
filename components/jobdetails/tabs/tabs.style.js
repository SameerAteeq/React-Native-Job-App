import {StyleSheet} from 'react-native';

import {COLORS, SHADOWS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.small,
    marginBottom: SIZES.small / 2,
  },
  btn: (name, activeTab) => ({
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    backgroundColor: name === activeTab ? COLORS.primary : '#F3F4F8',
    borderRadius: SIZES.medium,
    marginRight: 3,
    gap: 6,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  btnText: (name, activeTab) => ({
    fontFamily: 'DMMedium',
    fontSize: SIZES.small,
    color: name === activeTab ? '#C3BFCC' : '#AAA9B8',
  }),
});

export default styles;
