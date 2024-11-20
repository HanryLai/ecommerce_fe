import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const PaymentCheckSVG = (props: SvgProps) => (
    <Svg viewBox="0 0 80 80" fill="none" {...props}>
        <Path
            d="M40 0C17.96 0 0 17.96 0 40C0 62.04 17.96 80 40 80C62.04 80 80 62.04 80 40C80 17.96 62.04 0 40 0ZM59.12 30.8L36.44 53.48C35.88 54.04 35.12 54.36 34.32 54.36C33.52 54.36 32.76 54.04 32.2 53.48L20.88 42.16C19.72 41 19.72 39.08 20.88 37.92C22.04 36.76 23.96 36.76 25.12 37.92L34.32 47.12L54.88 26.56C56.04 25.4 57.96 25.4 59.12 26.56C60.28 27.72 60.28 29.6 59.12 30.8Z"
            fill="#20A94B"
        />
    </Svg>
);
