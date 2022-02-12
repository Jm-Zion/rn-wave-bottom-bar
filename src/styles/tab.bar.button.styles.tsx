import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
    elevation: 12,
  },
  squareFocusedButton: {
    borderRadius: 16,
  },
  focusedButton: {
    position: 'absolute',
    height: 60,
    width: 60,
    zIndex: -1,
    borderRadius: 32,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unfocusedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    elevation: 12,
    zIndex: 12,
  },
});
