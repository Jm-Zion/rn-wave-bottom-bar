import { StyleSheet } from 'react-native';

export const TAB_BAR_HEIGHT = 64;

export const style = StyleSheet.create({
  barShapeWrapper: { elevation: 11, zIndex: 0, backgroundColor: 'transparent' },
  container: {
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
    width: '100%',
    zIndex: -1,
    height: TAB_BAR_HEIGHT,
  },
});
