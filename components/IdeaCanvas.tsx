import { Canvas, Path, RoundedRect, RoundedRectProps, Skia } from "@shopify/react-native-skia"
import { useSharedValue } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import TextRepresentation from "./ideaVisualization/TextRepresentation";

export default () => {
    const canvasSize = useSharedValue({ width: 0, height: 0 });
    
    let roundedRectProperties: RoundedRectProps = {
        x: 20,
        y: 20,
        height: 80,
        width: 120,
        r: 0,
        color: "purple"
    };

    
    return (
        <Canvas style={styles.canvas} onSize={ canvasSize }>
            <RoundedRect {...roundedRectProperties}>

            </RoundedRect>
            <TextRepresentation />
        </Canvas>
    );
};

const styles = StyleSheet.create({
    canvas: {
        flex: 1,
        backgroundColor: "blue"
    }
});