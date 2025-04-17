import { Canvas, Path, RoundedRect, RoundedRectProps, Skia } from "@shopify/react-native-skia"
import { useSharedValue } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import TextRepresentation from "./ideaVisualization/TextRepresentation";

export default () => {
    const canvasSize = useSharedValue({ width: 0, height: 0 });

    return (
        <Canvas style={styles.canvas} onSize={canvasSize}>
            <TextRepresentation text={'If a temporary buffer is not allowed, I would iterate through the list with two pointers: one (current) traversing the list, and a second (runner) that checks all nodes after current for duplicates. If a duplicate is found, I\'d remove it by adjusting the Next pointer of the previous node. This approach takes O(n²) time but only O(1) space.'} />
        </Canvas>
    );
};

const styles = StyleSheet.create({
    canvas: {
        flex: 1
    }
});