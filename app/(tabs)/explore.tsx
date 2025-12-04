//This is Home Screen with Profile UI using SVG and Animations
import React, { useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
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

const ProfileScreen = () => {
  // Animation values
  const fadeIn = useSharedValue(0);
  const slideUp = useSharedValue(50);
  const profileScale = useSharedValue(0);
  const floatAnimation = useSharedValue(0);

  useEffect(() => {
    // Entry animations
    fadeIn.value = withTiming(1, { duration: 1000 });
    slideUp.value = withSpring(0, { damping: 15 });
    profileScale.value = withDelay(300, withSpring(1, { damping: 20 }));

    // Floating animation
    floatAnimation.value = withRepeat(
      withTiming(1, { duration: 4000 }),
      -1,
      true
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
    transform: [{ translateY: slideUp.value }],
  }));

  const profileStyle = useAnimatedStyle(() => ({
    transform: [{ scale: profileScale.value }],
  }));

  const floatStyle = useAnimatedStyle(() => {
    const translateY = interpolate(floatAnimation.value, [0, 1], [0, -15]);
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.backgroundContainer}>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient
              id="profileBackground"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor="#667eea" />
              <Stop offset="50%" stopColor="#764ba2" />
              <Stop offset="100%" stopColor="#f093fb" />
            </LinearGradient>
            <RadialGradient id="accent" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <Stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </RadialGradient>
          </Defs>
          <Rect width={width} height={height} fill="url(#profileBackground)" />

          {/* Decorative shapes */}
          <Animated.View style={floatStyle}>
            <Circle
              cx={width * 0.9}
              cy={height * 0.15}
              r="50"
              fill="rgba(210, 195, 195, 0.1)"
            />
            <Circle
              cx={width * 0.1}
              cy={height * 0.8}
              r="35"
              fill="rgba(255,255,255,0.08)"
            />
            <Rect
              x={width * 0.85}
              y={height * 0.6}
              width="60"
              height="60"
              rx="30"
              fill="rgba(255,255,255,0.06)"
            />
          </Animated.View>
        </Svg>
      </View>

      <Animated.View style={[styles.content, containerStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <Animated.View style={[styles.profileHeader, profileStyle]}>
            <Svg width="120" height="120" style={styles.profileImageContainer}>
              <Defs>
                <LinearGradient
                  id="avatarBorder"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#ff6b6b" />
                  <Stop offset="50%" stopColor="#feca57" />
                  <Stop offset="100%" stopColor="#48dbfb" />
                </LinearGradient>
              </Defs>
              <Circle cx="60" cy="60" r="48" fill="url(#avatarBorder)" />
              <Circle cx="60" cy="60" r="32" fill="rgba(255,255,255,0.2)" />
              <Circle cx="100" cy="60" r="45" fill="#4ecdc4" />
              {/* Simple avatar icon */}
              <Circle cx="60" cy="45" r="15" fill="white" />
              <Path d="M35,85 Q60,75 85,85" fill="white" />
            </Svg>

            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@email.com</Text>
          </Animated.View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Svg width="100%" height="80">
                <Defs>
                  <RadialGradient id="stat1" cx="50%" cy="50%" r="50%">
                    <Stop offset="0%" stopColor="rgba(255, 107, 107, 0.3)" />
                    <Stop offset="100%" stopColor="rgba(255, 107, 107, 0.1)" />
                  </RadialGradient>
                </Defs>
                <Rect width="100%" height="80" rx="15" fill="url(#stat1)" />
              </Svg>
              <View style={styles.statContent}>
                <Text style={styles.statNumber}>124</Text>
                <Text style={styles.statLabel}>Transactions</Text>
              </View>
            </View>

            <View style={styles.statCard}>
              <Svg width="100%" height="80">
                <Defs>
                  <RadialGradient id="stat2" cx="50%" cy="50%" r="50%">
                    <Stop offset="0%" stopColor="rgba(76, 175, 80, 0.3)" />
                    <Stop offset="100%" stopColor="rgba(76, 175, 80, 0.1)" />
                  </RadialGradient>
                </Defs>
                <Rect width="100%" height="80" rx="15" fill="url(#stat2)" />
              </Svg>
              <View style={styles.statContent}>
                <Text style={styles.statNumber}>98%</Text>
                <Text style={styles.statLabel}>Success Rate</Text>
              </View>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {[
              { icon: "settings", title: "Account Settings", color: "#ff6b6b" },
              { icon: "security", title: "Security", color: "#4ecdc4" },
              {
                icon: "notifications",
                title: "Notifications",
                color: "#feca57",
              },
              { icon: "help", title: "Help & Support", color: "#a855f7" },
              { icon: "privacy", title: "Privacy Policy", color: "#48dbfb" },
              { icon: "logout", title: "Log Out", color: "#ff6b6b" },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <Svg width="100%" height="60">
                  <Defs>
                    <LinearGradient
                      id={`menu${index}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <Stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                      <Stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                    </LinearGradient>
                  </Defs>
                  <Rect
                    width="100%"
                    height="60"
                    rx="15"
                    fill={`url(#menu${index})`}
                  />
                </Svg>

                <View style={styles.menuContent}>
                  <View style={styles.menuIconContainer}>
                    <Svg width="24" height="24">
                      <Circle cx="12" cy="12" r="12" fill={item.color} />
                      {/* Generic icon */}
                      <Rect
                        x="8"
                        y="8"
                        width="8"
                        height="8"
                        rx="2"
                        fill="white"
                      />
                    </Svg>
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Svg width="20" height="20">
                    <Path
                      d="M8,6 L14,12 L8,18"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Premium Card */}
          <View style={styles.premiumCard}>
            <Svg width="100%" height="120">
              <Defs>
                <LinearGradient
                  id="premiumBg"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <Stop offset="0%" stopColor="#ff9a9e" />
                  <Stop offset="50%" stopColor="#fecfef" />
                  <Stop offset="100%" stopColor="#fecfef" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="120" rx="20" fill="url(#premiumBg)" />

              {/* Decorative elements */}
              <Circle cx="340" cy="30" r="70" fill="rgba(186, 60, 60, 0.2)" />
              <Circle cx="120" cy="90" r="25" fill="rgba(152, 18, 18, 0.15)" />
            </Svg>

            <View style={styles.premiumContent}>
              <View>
                <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
                <Text style={styles.premiumSubtitle}>
                  Unlock exclusive features
                </Text>
              </View>
              <TouchableOpacity style={styles.premiumButton}>
                <Text style={styles.premiumButtonText}>Upgrade</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    height: 80,
    position: "relative",
    borderRadius: 15,
  },
  statContent: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    marginBottom: 15,
    borderRadius: 15,
    position: "relative",
  },
  menuContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuIconContainer: {
    marginRight: 15,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  premiumCard: {
    height: 120,
    borderRadius: 20,
    position: "relative",
  },
  premiumContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  premiumButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  premiumButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
