import React, { memo, useEffect } from 'react';
import { StyleProp, TouchableOpacity, View } from 'react-native';

import RNReanimated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { style } from '../styles/tab.bar.button.styles';

interface Props {
  mode: 'default' | 'square';
  index: number;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  options: BottomTabNavigationOptions;
  inactiveTintColor?: string;
  activeTintColor?: string;
  springConfig?: WithSpringConfig;
  focusedButtonStyle?: StyleProp<any>;
}

export const defaultSpringConfig: WithSpringConfig = {
  damping: 30,
  mass: 0.7,
  stiffness: 250,
};

export const BarButton: React.FC<Props> = memo(
  ({
    isFocused,
    options,
    onPress,
    onLongPress,
    inactiveTintColor,
    focusedButtonStyle,
    springConfig,
  }) => {
    const animationValueThreshold = useSharedValue(0);

    useEffect(() => {
      if (isFocused) {
        animationValueThreshold.value = withSpring(
          0,
          springConfig || defaultSpringConfig
        );
      } else {
        animationValueThreshold.value = withSpring(
          1,
          springConfig || defaultSpringConfig
        );
      }
    }, [isFocused, animationValueThreshold, springConfig]);

    const animatedStyles = useAnimatedStyle(() => {
      return {
        opacity: animationValueThreshold.value,
        transform: [
          {
            scale: animationValueThreshold.value,
          },
        ],
      };
    });

    const textAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(animationValueThreshold.value, [0.5, 1], [0, 1]),
      };
    });

    return (
      <View style={style.wrapper}>
        <RNReanimated.View style={animatedStyles}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[style.unfocusedButton, isFocused ? focusedButtonStyle : {}]}
            onLongPress={onLongPress}
          >
            <View style={style.tabBarLabelWrapper}>
              {options.tabBarIcon && !isFocused ? (
                options.tabBarIcon({
                  focused: isFocused,
                  color: inactiveTintColor || 'white',
                  size: 28,
                })
              ) : (
                <View />
              )}
              {options.tabBarLabel && (
                <RNReanimated.Text
                  style={[
                    {
                      marginTop: 2,
                      color: inactiveTintColor,
                    },
                    textAnimatedStyle,
                    options.tabBarLabelStyle,
                  ]}
                >
                  {options.tabBarLabel}
                </RNReanimated.Text>
              )}
            </View>
          </TouchableOpacity>
        </RNReanimated.View>
      </View>
    );
  }
);

export const TabBarButton: React.FC<Props> = memo(
  ({
    isFocused,
    options,
    onPress,
    onLongPress,
    activeTintColor,
    springConfig,
    focusedButtonStyle,
    mode,
  }) => {
    const animationValueThreshold = useSharedValue(0);

    useEffect(() => {
      if (isFocused) {
        animationValueThreshold.value = withSpring(
          0,
          springConfig || defaultSpringConfig
        );
      } else {
        animationValueThreshold.value = withSpring(
          1,
          springConfig || defaultSpringConfig
        );
      }
    }, [isFocused, animationValueThreshold, springConfig]);

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              animationValueThreshold.value,
              [0, 1],
              [-18, 100]
            ),
          },
        ],
      };
    });

    return (
      <View style={style.wrapper}>
        <RNReanimated.View
          style={[
            animatedStyles,
            { backgroundColor: 'green' },
            style.focusedButton,
          ]}
        >
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[
              {
                ...style.focusedButton,
                ...(mode === 'square' ? style.squareFocusedButton : {}),
                backgroundColor: activeTintColor || 'white',
              },
              isFocused ? focusedButtonStyle : {},
            ]}
            onLongPress={onLongPress}
          >
            {options.tabBarIcon
              ? options.tabBarIcon({
                  focused: isFocused,
                  color: 'white',
                  size: 28,
                })
              : null}
          </TouchableOpacity>
        </RNReanimated.View>
      </View>
    );
  }
);

export default TabBarButton;
