import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

interface AnimatedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradientType?: "linear" | "radial";
  colors?: string[];
  onPress?: () => void;
  pressAnimation?: boolean;
}

export default function AnimatedCard({
  children,
  style,
  gradientType = "linear",
  colors = ["rgba(255,255,255,0.25)", "rgba(255,255,255,0.1)"],
  onPress,
  pressAnimation = true,
}: AnimatedCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    if (pressAnimation) {
      scale.value = withSpring(0.95, { damping: 15 }, () => {
        scale.value = withSpring(1, { damping: 15 });
      });
    }
    onPress?.();
  };

  const gradientId = `card-gradient-${Math.random().toString(36).substr(2, 9)}`;

  const CardWrapper = onPress ? TouchableOpacity : Animated.View;

  return (
    <CardWrapper
      style={[
        styles.container,
        style,
        pressAnimation ? animatedStyle : undefined,
      ]}
      onPress={onPress ? handlePress : undefined}
      activeOpacity={0.9}
    >
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          {gradientType === "linear" ? (
            <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {colors.map((color, index) => (
                <Stop
                  key={index}
                  offset={`${(index / (colors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </LinearGradient>
          ) : (
            <RadialGradient id={gradientId} cx="50%" cy="50%" r="50%">
              {colors.map((color, index) => (
                <Stop
                  key={index}
                  offset={`${(index / (colors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </RadialGradient>
          )}
        </Defs>
        <Rect
          width="100%"
          height="100%"
          rx="20"
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
      </Svg>
      {children}
    </CardWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
  },
});
