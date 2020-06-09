import { StyleSheet } from 'react-native';

export const TAB_BAR_HEIGHT = 64;

export const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  bottomFill: {
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  fabButtonsContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    zIndex: -1,
    height: TAB_BAR_HEIGHT,
  },
});
