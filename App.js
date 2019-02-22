import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions } from 'react-native';
import Gradient from 'react-native-css-gradient';
import { interpolate } from 'flubber';
import { tween, easing } from 'popmotion';
import { Svg } from 'expo'
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');
const { Path, G } = Svg;

const fill = "#333";
const types = ['upset', 'sad', 'neutral', 'smile', 'excited'];
const PATHS = {
  "upset": "M141.5 132.55C140.92 75.87 120.92 48.22 81.5 49.63C42.09 51.03 22.09 78.67 21.5 132.55L141.5 132.55Z",
  "sad": "M122.32 87.65C121.94 68.08 108.83 58.53 83 59.02C57.17 59.5 44.06 69.04 43.68 87.65L122.32 87.65Z",
  "neutral": "M38.02 58.05L99.77 40.83L102.99 52.35L41.23 69.57L38.02 58.05Z",
  "smile": "M122.32 64.68C121.94 84.25 108.83 93.79 83 93.31C57.17 92.82 44.06 83.28 43.68 64.68L122.32 64.68Z",
  "excited": "M142.99 49.74C142.4 106.42 122.4 134.06 82.99 132.66C43.57 131.26 23.57 103.62 22.99 49.74L142.99 49.74Z",
  "left-eye": "M30.43 16.78C30.43 24.39 24.29 30.57 16.72 30.57C9.15 30.57 3 24.39 3 16.78C3 9.18 9.15 3 16.72 3C24.29 3 30.43 9.18 30.43 16.78Z",
  "right-eye": "M162.99 16.79C162.99 24.4 156.84 30.57 149.27 30.57C141.7 30.57 135.56 24.4 135.56 16.79C135.56 9.18 141.7 3.01 149.27 3.01C156.84 3.01 162.99 9.18 162.99 16.79Z"
};
const GRADIENTS = {
  "upset": "linear-gradient(to bottom, rgb(231, 97, 97), rgb(236, 49, 49))",
  "sad": "linear-gradient(to bottom, rgb(247,152,48), rgb(231, 97, 97))",
  "neutral": "linear-gradient(to bottom, rgb(243, 189, 67), rgb(203,96,32))",
  "smile": "linear-gradient(to bottom, rgb(238,172,77), rgb(187, 230, 95))",
  "excited": "linear-gradient(to bottom, rgb(95,230,118), rgb(46, 232, 78))",
};

export default class App extends React.Component {
  state = {
    path: PATHS.neutral,
    background: GRADIENTS.neutral,
    type: "neutral",
    index: -1
  }

  interpolatePaths = (type, index) => {
    const interpolator = interpolate(this.state.path, PATHS[type], { maxSegmentLength: 2 });
    tween({
      duration: 400,
      ease: easing.easeInOut,
      from: { i: 0, background: this.state.background },
      to: { i: 1, background: GRADIENTS[type] }
    })
      .pipe(({ i, background }) => ({ path: interpolator(i), background }))
      .start(({ path, background }) => {
        this.setState({
          path, background, type, index
        })
      })
  }

  render() {
    return (
      <Gradient gradient={this.state.background} style={styles.gradient}>
        <View style={styles.headings}>
          <Text style={styles.heading}>Please rate your feedback</Text>
          <Text style={styles.body}>Do let us know your thoughts.</Text>
          <Text style={styles.body}>Your feedback matters!</Text>
        </View>
        <View style={styles.svgWrapper}>
          <Svg width={width} height={height / 3} viewBox="0 0 166 136" style={styles.svgContainer}>
            <G>
              <Path d={PATHS["left-eye"]} fill={fill} />
              <Path d={this.state.path} fill={fill} />
              <Path d={PATHS["right-eye"]} fill={fill} />
            </G>
          </Svg>
          <View style={styles.feedbackWrapper}>
            {types.map((type, index) => (
              <TouchableOpacity key={type} onPress={() => this.interpolatePaths(type, index)}>
                <AntDesign name={this.state.index >= index ? "star" : "staro"} size={32} color="#fff" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Gradient>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    width,
    height,
    alignItems: "center",
  },
  feedbackWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: width * .9
  },
  headings: {
    flex: .4,
    justifyContent: "center"
  },
  heading: {
    color: "#fff",
    fontSize: 42,
    lineHeight: 42,
    fontWeight: '700'
  },
  body: {
    color: "#fff",
    fontFamily: "Menlo"
  },
  svgContainer: {
    marginBottom: 40
  },
  svgWrapper: {
    flex: .6,
    alignItems: "center",
    justifyContent: "center"
  }
});
