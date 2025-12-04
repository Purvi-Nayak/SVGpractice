# SVG Usage Guide

This documentation covers SVG elements, Props and usage for React Native SVG library.

## Supported SVG Elements

### Elements

Circle, Ellipse, G, Text, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect, Use, Image, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask, ForeignObject

## CSS Support

For remote SVG files with CSS:

```jsx
import { SvgCssUri } from "react-native-svg/css";

<SvgCssUri
  width="100"
  height="100"
  uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/ruby.svg"
  onError={onError}
  onLoad={onLoad}
/>;
```

For inline CSS:

```jsx
<SvgCss
  xml={svg}
  css={`
    path {
      fill: red;
    }
  `}
  width={200}
  height={200}
/>
```

## Path Commands

| Command                     | Name               | Meaning                            |
| --------------------------- | ------------------ | ---------------------------------- |
| M x y                       | MoveTo             | Move to coordinate without drawing |
| L x y                       | LineTo             | Draw straight line                 |
| H x                         | Horizontal line    | Move horizontally                  |
| V y                         | Vertical line      | Move vertically                    |
| C x1 y1 x2 y2 x y           | Cubic curve        | Smooth S-curve                     |
| S x2 y2 x y                 | Smooth cubic curve | Continues last curve               |
| Q x1 y1 x y                 | Quadratic curve    | Simpler curve                      |
| T x y                       | Smooth quadratic   | Continues last quad                |
| A rx ry rot large small x y | Arc                | Draws circular/elliptical arc      |
| Z                           | ClosePath          | Closes the shape                   |

### Path Examples:

Arc Example:

```jsx
<Path d="M 40 60 A 10 10 0 0 0 60 60" stroke="black" />
```

- Moves to point (40,60)
- Draws an arc with radius 10x10 to point (60,60)

Diagonal Line:

```jsx
<Path d="M0,0L512,512" stroke="currentColor" strokeWidth="32" />
```

- Moves to (0,0)
- Draws line to (512,512) - creates diagonal line

## SVG Container Props

| Prop                | Description                                   |
| ------------------- | --------------------------------------------- |
| width               | Width of SVG                                  |
| height              | Height of SVG                                 |
| viewBox             | Defines SVG coordinate system ("0 0 100 100") |
| preserveAspectRatio | Controls scaling behavior                     |
| fill                | Default fill color                            |
| stroke              | Default stroke color                          |
| strokeWidth         | Width of stroke                               |
| opacity             | Transparency                                  |
| color               | Sets currentColor                             |
| style               | RN style object                               |
| transform           | Transform string (translate, rotate, scale)   |
| onPress             | Touch handler                                 |

## 2. Shape Elements

### 2.1 Circle

| Prop | Description |
| ---- | ----------- |
| cx   | Center X    |
| cy   | Center Y    |
| r    | Radius      |

```jsx
<Circle cx="50" cy="50" r="40" fill="red" />
```

### 2.2 Ellipse

| Prop | Description       |
| ---- | ----------------- |
| cx   | Center X          |
| cy   | Center Y          |
| rx   | Horizontal radius |
| ry   | Vertical radius   |

### 2.3 Rect

| Prop   | Description                |
| ------ | -------------------------- |
| x      | X position                 |
| y      | Y position                 |
| width  | Width                      |
| height | Height                     |
| rx     | Border radius (horizontal) |
| ry     | Border radius (vertical)   |

### 2.4 Line

| Prop   | Description |
| ------ | ----------- |
| x1, y1 | Start point |
| x2, y2 | End point   |

### 2.5 Polyline

| Prop   | Description       |
| ------ | ----------------- |
| points | "0,0 10,20 30,40" |

### 2.6 Polygon

| Prop   | Description      |
| ------ | ---------------- |
| points | Same as Polyline |

### 2.7 Path

| Prop | Description   |
| ---- | ------------- |
| d    | SVG path data |

## 3. Styling Props (All Shapes)

| Prop             | Description         |
| ---------------- | ------------------- |
| fill             | Fill color          |
| fillOpacity      | Opacity of fill     |
| stroke           | Stroke color        |
| strokeWidth      | Stroke width        |
| strokeOpacity    | Opacity of stroke   |
| strokeLinecap    | round, square, butt |
| strokeLinejoin   | miter, round, bevel |
| strokeDasharray  | [4, 2] dashed lines |
| strokeDashoffset | Dash offset         |
| opacity          | Overall opacity     |

## 4. Transform Props

| Prop      | Example                 |
| --------- | ----------------------- |
| rotate    | "45" or "45 50 50"      |
| scale     | "2" or "2 1"            |
| translate | "10 20"                 |
| skewX     | "30"                    |
| skewY     | "15"                    |
| transform | "rotate(45) scale(1.2)" |

## 5. Text Props

| Prop              | Description           |
| ----------------- | --------------------- |
| x, y              | Coordinates           |
| dx, dy            | Text shift            |
| fontSize          | Text size             |
| fontWeight        | Boldness              |
| fontStyle         | Italic                |
| fontFamily        | Font family           |
| textAnchor        | start, middle, end    |
| alignmentBaseline | Text alignment        |
| fill              | Text color            |
| letterSpacing     | Space between letters |
| rotate            | Rotate characters     |

### TSpan

Used for multiple lines of text in SVG. Positions text relative to previous line.

## 6. ClipPath

| Prop | Description       |
| ---- | ----------------- |
| id   | Unique identifier |

## 7. Mask

| Prop             | Description            |
| ---------------- | ---------------------- |
| id               | Unique identifier      |
| maskUnits        | Units for mask         |
| maskContentUnits | Units for mask content |

```jsx
<Mask id="mask1">
  <Rect width="100" height="100" fill="white" />
</Mask>
```

## 8. Gradients

### Linear Gradient Types

- Horizontal: y1 = y2, x1 ≠ x2
- Vertical: x1 = x2, y1 ≠ y2
- Angular: x1 ≠ x2, y1 ≠ y2

### LinearGradient

| Prop   | Description |
| ------ | ----------- |
| id     | Unique ID   |
| x1, y1 | Start point |
| x2, y2 | End point   |

### RadialGradient

| Prop      | Description     |
| --------- | --------------- |
| cx, cy, r | Center & radius |
| fx, fy    | Focal points    |

### Stop

| Prop        | Description    |
| ----------- | -------------- |
| offset      | "0%" to "100%" |
| stopColor   | Color          |
| stopOpacity | Opacity        |

## 9. Pattern Props

| Prop          | Description      |
| ------------- | ---------------- |
| id            | Pattern ID       |
| width, height | Pattern size     |
| patternUnits  | "userSpaceOnUse" |
| viewBox       | Optional         |

## 10. Marker

Description: Used for arrow heads and decorations on path vertices.

```jsx
<Marker id="arrow" markerWidth="10" markerHeight="10">
  <Path d="M0,0 L10,5 L0,10 z" fill="black" />
</Marker>
```

## 11. ForeignObject

Allows inclusion of non-SVG content within SVG graphics.

## 12. Touch Events

### Events

- disabled
- onPress
- onPressIn
- onPressOut
- onLongPress
- delayPressIn
- delayPressOut
- delayLongPress

## 13. Filters

### Available Filters

- FeBlend
- FeComposite
- FeColorMatrix
- FeDropShadow
- FeFlood
- FeGaussianBlur
- FeMerge
- FeOffset

## Complete Examples

### Example 1: Simple Icon

```jsx
<Svg width="100" height="100" viewBox="0 0 100 100">
  <Circle
    cx="50"
    cy="50"
    r="40"
    fill="#3498db"
    stroke="#2980b9"
    strokeWidth="4"
  />
  <Path
    d="M30,50 L45,65 L70,35"
    stroke="white"
    strokeWidth="6"
    strokeLinecap="round"
    fill="none"
  />
</Svg>
```

### Example 2: Star with Gradient

```jsx
<Svg width="100" height="100" viewBox="0 0 100 100">
  <Defs>
    <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <Stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
      <Stop offset="100%" stopColor="#FFA500" stopOpacity="1" />
    </LinearGradient>
  </Defs>
  <Path
    d="M50,15 L58,35 L78,35 L62,47 L70,67 L50,55 L30,67 L38,47 L22,35 L42,35 Z"
    fill="url(#grad)"
    stroke="#FF8C00"
    strokeWidth="2"
  />
</Svg>
```

### Example 3: Modern Dashboard Card (From Your App)

```jsx
<Svg width="100%" height="200" style={styles.cardBackground}>
  <Defs>
    <LinearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <Stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
      <Stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
    </LinearGradient>
    <RadialGradient id="accent" cx="80%" cy="20%" r="60%">
      <Stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
      <Stop offset="100%" stopColor="rgba(255,255,255,0)" />
    </RadialGradient>
  </Defs>

  <Rect
    width="100%"
    height="200"
    rx="20"
    fill="url(#cardGradient)"
    stroke="rgba(255,255,255,0.2)"
    strokeWidth="1"
  />
  <Rect width="100%" height="200" rx="20" fill="url(#accent)" />

  {/* Decorative elements */}
  <Circle cx="300" cy="50" r="80" fill="rgba(255,255,255,0.1)" />
  <Circle cx="320" cy="180" r="60" fill="rgba(255,255,255,0.08)" />
</Svg>
```

### Example 4: Animated Progress Circle (From Your App)

```jsx
<Svg width="120" height="120">
  <Defs>
    <LinearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <Stop offset="0%" stopColor="#ff6b6b" />
      <Stop offset="100%" stopColor="#feca57" />
    </LinearGradient>
  </Defs>

  {/* Background circle */}
  <Circle
    cx="60"
    cy="60"
    r="50"
    stroke="rgba(255,255,255,0.2)"
    strokeWidth="8"
    fill="transparent"
  />

  {/* Progress circle */}
  <Circle
    cx="60"
    cy="60"
    r="50"
    stroke="url(#progressGrad)"
    strokeWidth="8"
    fill="transparent"
    strokeDasharray="314"
    strokeDashoffset="80"
    strokeLinecap="round"
    transform="rotate(-90 60 60)"
  />

  {/* Center dot */}
  <Circle cx="60" cy="60" r="5" fill="#ff6b6b" />
</Svg>
```

### Example 5: Chart with Curved Lines (From Your App)

```jsx
<Svg width="100%" height="160">
  <Defs>
    <LinearGradient id="chartBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <Stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
      <Stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
    </LinearGradient>
  </Defs>

  <Rect width="100%" height="160" rx="20" fill="url(#chartBg)" />

  {/* Curved chart line */}
  <Path
    d="M20,120 Q80,80 140,100 T260,90 T320,70"
    stroke="#ff6b6b"
    strokeWidth="3"
    fill="transparent"
    strokeLinecap="round"
  />

  {/* Data points */}
  <Circle cx="20" cy="120" r="4" fill="#ff6b6b" />
  <Circle cx="140" cy="100" r="4" fill="#ff6b6b" />
  <Circle cx="260" cy="90" r="4" fill="#ff6b6b" />
  <Circle cx="320" cy="70" r="4" fill="#ff6b6b" />
</Svg>
```

### Example 6: Action Button with Icon (From Your App)

```jsx
<TouchableOpacity onPress={handlePress}>
  <Svg width="60" height="60">
    <Defs>
      <LinearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#ff6b6b" />
        <Stop offset="100%" stopColor="#feca57" />
      </LinearGradient>
    </Defs>

    <Circle cx="30" cy="30" r="30" fill="url(#btnGrad)" />

    {/* Send arrow icon */}
    <Path
      d="M20,30 L30,20 L40,30 M30,20 L30,40"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
</TouchableOpacity>
```

### Example 7: Glass-morphism Background (From Your App)

```jsx
<Svg width={width} height={height} style={StyleSheet.absoluteFill}>
  <Defs>
    <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <Stop offset="0%" stopColor="#667eea" />
      <Stop offset="50%" stopColor="#764ba2" />
      <Stop offset="100%" stopColor="#f093fb" />
    </LinearGradient>
    <RadialGradient id="floatingCircle" cx="50%" cy="50%" r="50%">
      <Stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
      <Stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
    </RadialGradient>
  </Defs>

  <Rect width={width} height={height} fill="url(#bgGrad)" />

  {/* Floating decorative elements */}
  <Circle
    cx={width * 0.8}
    cy={height * 0.1}
    r="60"
    fill="url(#floatingCircle)"
  />
  <Circle
    cx={width * 0.2}
    cy={height * 0.9}
    r="40"
    fill="url(#floatingCircle)"
  />
  <Circle
    cx={width * 1.1}
    cy={height * 0.3}
    r="80"
    fill="rgba(255,255,255,0.05)"
  />
</Svg>
```

## Advanced Techniques from Your App

### 1. Glass-morphism Cards

- Use semi-transparent fills with gradients
- Combine LinearGradient and RadialGradient overlays
- Apply subtle borders with `stroke` and low opacity

### 2. Interactive Animations

- Use `react-native-reanimated` for smooth animations
- Combine with SVG for performant graphics
- Apply scale transforms on touch interactions

### 3. Progress Indicators

- Use `strokeDasharray` and `strokeDashoffset` for progress
- Rotate circles to start from top (-90 degrees)
- Animate with `withSpring` for natural movement

### 4. Curved Chart Lines

- Use quadratic curves (Q) and smooth curves (T)
- Combine with data points using Circle elements
- Apply gradients to lines for modern look

### 5. Layered Visual Effects

- Stack multiple SVG elements for depth
- Use different opacity levels for layering
- Combine shapes for complex designs

## Best Practices

1. **Performance**: Use `react-native-reanimated` for animations
2. **Accessibility**: Add proper touch targets and labels
3. **Responsiveness**: Use percentage values and viewBox
4. **Gradients**: Always define unique IDs for gradients
5. **Memory**: Optimize complex paths and avoid unnecessary re-renders
6. **Touch**: Ensure minimum 44pt touch targets for interactive elements

## Animation Integration

### With React Native Reanimated

```jsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

const handlePress = () => {
  scale.value = withSpring(0.95, {}, () => {
    scale.value = withSpring(1);
  });
};

<Animated.View style={animatedStyle}>
  <Svg>{/* Your SVG content */}</Svg>
</Animated.View>;
```

---

**Reference**: [React Native SVG Documentation](https://github.com/software-mansion/react-native-svg/blob/main/USAGE.md)
