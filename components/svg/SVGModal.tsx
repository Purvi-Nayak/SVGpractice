import React, { useEffect } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");

interface SVGModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  modalType?: "default" | "success" | "warning" | "error";
}

export default function SVGModal({
  visible,
  onClose,
  title = "Modal",
  children,
  modalType = "default",
}: SVGModalProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(50);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 20 });
      translateY.value = withSpring(0, { damping: 15 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.8, { duration: 200 });
      translateY.value = withTiming(50, { duration: 200 });
    }
  }, [visible]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const getModalColors = () => {
    switch (modalType) {
      case "success":
        return ["rgba(76, 175, 80, 0.9)", "rgba(56, 142, 60, 0.9)"];
      case "warning":
        return ["rgba(255, 193, 7, 0.9)", "rgba(255, 152, 0, 0.9)"];
      case "error":
        return ["rgba(244, 67, 54, 0.9)", "rgba(211, 47, 47, 0.9)"];
      default:
        return ["rgba(103, 126, 234, 0.9)", "rgba(118, 75, 162, 0.9)"];
    }
  };

  const getIconPath = () => {
    switch (modalType) {
      case "success":
        return "M9,16.17L5.53,12.7L4.12,14.11L9,19L21,7L19.59,5.59L9,16.17Z";
      case "warning":
        return "M12,2L13.09,8.26L22,9L13.09,15.74L12,22L10.91,15.74L2,9L10.91,8.26L12,2Z";
      case "error":
        return "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
      default:
        return "M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1L9,7V9H7V11H9V13H7V15H9L15,23L21,15H23V13H21V11H23V9H21Z";
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="none"
    >
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, overlayStyle]}>
        <TouchableOpacity style={styles.backdropTouchable} onPress={onClose} />
      </Animated.View>

      {/* Modal Content */}
      <Animated.View style={[styles.modalContainer, modalStyle]}>
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="modalBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={getModalColors()[0]} />
              <Stop offset="100%" stopColor={getModalColors()[1]} />
            </LinearGradient>
            <RadialGradient id="modalOverlay" cx="50%" cy="30%" r="50%">
              <Stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <Stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </RadialGradient>
          </Defs>

          <Rect width="100%" height="100%" rx="25" fill="url(#modalBg)" />
          <Rect width="100%" height="100%" rx="25" fill="url(#modalOverlay)" />

          {/* Decorative elements */}
          <Circle cx="280" cy="50" r="30" fill="rgba(255,255,255,0.1)" />
          <Circle cx="50" cy="200" r="20" fill="rgba(255,255,255,0.08)" />
        </Svg>

        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.iconContainer}>
              <Svg width="40" height="40">
                <Circle cx="20" cy="20" r="20" fill="rgba(255,255,255,0.2)" />
                <Path
                  d={getIconPath()}
                  fill="white"
                  transform="translate(8, 8) scale(0.6)"
                />
              </Svg>
            </View>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Svg width="24" height="24">
                <Path
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                  fill="rgba(255,255,255,0.8)"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={styles.modalBody}>{children}</View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  backdropTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    position: "absolute",
    top: "20%",
    left: 20,
    right: 20,
    maxHeight: height * 0.6,
    borderRadius: 25,
  },
  modalContent: {
    padding: 25,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 15,
  },
  modalTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    minHeight: 100,
  },
});
