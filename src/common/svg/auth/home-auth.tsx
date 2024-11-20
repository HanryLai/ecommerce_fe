import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
export const HomeAuthSVG = (props: SvgProps) => (
    <Svg viewBox="0 0 16 16" fill="none" stroke="#285a67" {...props}>
        <G id="SVGRepo_bgCarrier" strokeWidth={0} />
        <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <G id="SVGRepo_iconCarrier">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z"
                fill="#fff"
            />
        </G>
    </Svg>
);
