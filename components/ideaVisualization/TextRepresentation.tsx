import { Platform, useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { Paragraph, Skia, FontStyle, useFonts, TextAlign, rrect, rect, DiffRect, Text } from '@shopify/react-native-skia';

export interface TextRepresentationProps {
    text: string;
};

export const TextRepresentation = (props: TextRepresentationProps) => {
    const fontProvider = useFonts({
        SpaceMono: [
            Platform.OS === 'web' ?
                { default: require('../../assets/fonts/SpaceMono-Regular.ttf') } :
                require('../../assets/fonts/SpaceMono-Regular.ttf')] //Workaround for react-native-skia issue: https://github.com/Shopify/react-native-skia/issues/2784
    });

    const drawColor = useColorScheme() === 'dark' ?
        Skia.Color('#888') :
        Skia.Color('#000');

    const paragraph = useMemo(() => {
        if (!fontProvider) {
            return null;
        }

        return Skia.ParagraphBuilder.Make({ textAlign: TextAlign.Center }, fontProvider)
            .pushStyle({
                fontSize: 24,
                fontFamilies: ['SpaceMono'],
                color: drawColor,
                fontStyle: FontStyle.Normal
            })
            .addText(props.text)
            .build();
    }, [props, drawColor, fontProvider]);

    if (!paragraph) return null;

    //Trigger calculation of max width
    paragraph.layout(1000);

    const paragraphLineMetrics = paragraph.getLineMetrics() || [];
    const combinedLineMetrics: { w: number, h: number } = paragraphLineMetrics.reduce((previous, skRect) => ({ w: previous.w + skRect.width, h: skRect.height }), { w: 0, h: 0 });

    const scaleFactor = Math.floor(Math.sqrt(combinedLineMetrics.w / combinedLineMetrics.h));
    const squareWidth = Math.floor(combinedLineMetrics.w / scaleFactor);

    paragraph.layout(squareWidth);
    const paragraphWidth = paragraph.getMaxWidth();
    const paragraphHeight = paragraph.getHeight();

    console.log(`ParaW = ${paragraphWidth}, ParaH = ${paragraphHeight}`);

    //Draw a rounded rectange around the text

    const padding = 10;
    const boarderThickness = 5;
    const posX = 500;
    const posY = 500;

    const innerRectWidth = paragraphWidth + padding * 2;
    const innerRectHeight = paragraphHeight + padding * 2;
    const innerRectX = posX - innerRectWidth / 2;
    const innerRectY = posY - innerRectHeight / 2;
    const innerRectCornerRadius = 5;

    const outerRectWidth = innerRectWidth + boarderThickness * 2;
    const outerRectHeight = innerRectHeight + boarderThickness * 2;
    const outerRectX = posX - outerRectWidth / 2;
    const outerRectY = posY - outerRectHeight / 2;
    const outerRectCornerRadius = innerRectCornerRadius + boarderThickness;

    const innerRect = rrect(rect(innerRectX, innerRectY, innerRectWidth, innerRectHeight), innerRectCornerRadius, innerRectCornerRadius);
    const outerRect = rrect(rect(outerRectX, outerRectY, outerRectWidth, outerRectHeight), outerRectCornerRadius, outerRectCornerRadius);

    return (
        <>
            <Paragraph paragraph={paragraph} x={posX-paragraphWidth/2} y={posY-paragraphHeight/2} width={paragraphWidth} />
            <DiffRect inner={innerRect} outer={outerRect} color={drawColor} />
        </>
    );
};

export default TextRepresentation;