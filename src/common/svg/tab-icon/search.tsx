import * as React from "react";
import Svg, { SvgProps, Rect, Defs, Pattern, Use, Image, G, Path } from "react-native-svg";
export const SearchSVG = (props: SvgProps) => (
    <Svg viewBox="0 0 24 24" fill="none" {...props}>
        <G id="SVGRepo_bgCarrier" strokeWidth={0} />
        <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <G id="SVGRepo_iconCarrier">
            <Path
                d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="#05bed6"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
    </Svg>
);
