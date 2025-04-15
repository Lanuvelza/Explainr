import { useColorScheme } from 'react-native';
import { Text, RoundedRect, matchFont } from '@shopify/react-native-skia';

const TextRepresentation = () => {
    const fontStyle = {
        fontFamily: "serif",
        fontSize: 12
    }
    const font = matchFont(fontStyle);
    return (
        <>
            <RoundedRect x={200} y={300} width={500} height={80} />
        </>
    );
};

export default TextRepresentation;