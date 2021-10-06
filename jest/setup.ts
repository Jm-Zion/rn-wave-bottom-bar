import { View } from 'react-native';

jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: () => ({
      Navigator: 'Navigator',
      Screen: 'Screen',
    }),
  };
});
