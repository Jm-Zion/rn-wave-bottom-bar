import React, { memo, useEffect, useState } from 'react';
import { Animated, StyleProp, TouchableOpacity, View } from 'react-native';

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { style } from '../styles/tab.bar.button.styles';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
  index: number;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
  options: BottomTabNavigationOptions;
  inactiveTintColor?: string;
  activeTintColor?: string;
  springConfig?: Animated.SpringAnimationConfig;
  focusedButtonStyle?: StyleProp<any>;
}

export const defaultSpringConfig = {
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
    springConfig,
  }) => {
    const [animationValueThreshold] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.spring(animationValueThreshold, {
        toValue: isFocused ? 0 : 1,
        ...(springConfig || defaultSpringConfig),
        useNativeDriver: true,
      }).start();
    }, [isFocused, animationValueThreshold]);

    return (
      <View style={style.wrapper}>
        <AnimatedTouchable
          accessibilityRole="button"
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          style={[
            style.unfocusedButton,
            { opacity: animationValueThreshold },
            {
              transform: [
                {
                  scale: animationValueThreshold.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
          onLongPress={onLongPress}
        >
          <View style={{ zIndex: 12 }}>
            {options.tabBarIcon && !isFocused ? (
              options.tabBarIcon({
                focused: isFocused,
                color: inactiveTintColor || 'white',
                size: 28,
              })
            ) : (
              <View />
            )}
          </View>
        </AnimatedTouchable>
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
  }) => {
    const [animationValueThreshold] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.spring(animationValueThreshold, {
        toValue: isFocused ? 0 : 1,
        ...(springConfig || defaultSpringConfig),
        useNativeDriver: true,
      }).start();
    }, [isFocused, animationValueThreshold]);

    return (
      <View style={style.wrapper}>
        <AnimatedTouchable
          accessibilityRole="button"
          accessibilityComponentType="Button"
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          style={[
            {
              ...style.focusedButton,
              backgroundColor: activeTintColor || 'white',
              transform: [
                {
                  translateY: animationValueThreshold.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-18, 100],
                  }),
                },
              ],
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
        </AnimatedTouchable>
      </View>
    );
  }
);

export default TabBarButton;
