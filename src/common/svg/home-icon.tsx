import * as React from "react";
import Svg, { SvgProps, Rect, Defs, Pattern, Use, Image } from "react-native-svg";
export const HomeIconSVGT = (props: SvgProps) => (
    <Svg viewBox="0 0 25 26" fill="none" {...props}>
        <Rect y={0.154297} width={25} height={24.9983} fill="url(#pattern0_1_413)" />
        <Defs>
            <Pattern
                id="pattern0_1_413"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#image0_1_413" transform="scale(0.0025)" />
            </Pattern>
            <Image
                id="image0_1_413"
                width={400}
                height={400}
                xlinkHref="data:image/png;base64,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"
            />
        </Defs>
    </Svg>
);
