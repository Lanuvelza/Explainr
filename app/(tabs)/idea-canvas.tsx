import { View, Text, StyleSheet } from "react-native";
import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";

const IdeaCanvasView = () => {
    
    return (
        <View>
            <WithSkiaWeb
                getComponent={() => import("@/components/IdeaCanvas")}
                fallback={<Text>Loading Skia...</Text>}
            / >
        </View>
    );
};

const styles = StyleSheet.create({
    ideaCanvas: {
        flex: 1
    }
});

export default IdeaCanvasView;