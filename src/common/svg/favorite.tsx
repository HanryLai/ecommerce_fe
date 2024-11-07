import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface SvgPropsScale extends SvgProps {
    size: number;
}

export const Favorite = ({ size, ...props }: SvgPropsScale) => (
    <Svg fill="none" viewBox="0 0 25 25" width={size} height={size}>
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 6.25043C10.6256 4.06604 7.49351 3.39096 5.14503 5.39121C2.79654 7.39146 2.46591 10.7358 4.31019 13.1015C5.84358 15.0684 10.4842 19.2168 12.0051 20.5595C12.1752 20.7097 12.2603 20.7848 12.3596 20.8143C12.4461 20.84 12.5409 20.84 12.6276 20.8143C12.7269 20.7848 12.8119 20.7097 12.9821 20.5595C14.503 19.2168 19.1435 15.0684 20.677 13.1015C22.5213 10.7358 22.2309 7.37042 19.8421 5.39121C17.4532 3.412 14.3744 4.06604 12.5 6.25043Z"
            stroke={props.color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        />
    </Svg>
);
