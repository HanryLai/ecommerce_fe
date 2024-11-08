import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from "react-native-svg";
export const PersonalSVG = (props: SvgProps) => (
    <Svg viewBox="0 0 74 74" fill="none" {...props}>
        <G clipPath="url(#clip0_121_181)">
            <Path
                d="M36.8844 -0.0693819C37.0465 -0.0692813 37.2086 -0.0691807 37.3756 -0.069077C40.0805 -0.0613873 42.6836 0.116985 45.325 0.739993C45.4937 0.77964 45.6624 0.819287 45.8362 0.860135C55.4914 3.2169 63.5828 9.39778 68.82 17.76C68.9251 17.9263 68.9251 17.9263 69.0323 18.096C71.2201 21.6102 72.5724 25.572 73.445 29.6C73.494 29.8119 73.494 29.8119 73.5439 30.0281C74.5321 34.4363 74.4458 39.8194 73.445 44.215C73.4133 44.3635 73.3815 44.512 73.3488 44.665C71.8743 51.4881 68.579 57.7911 63.7174 62.8123C63.4469 63.0934 63.1818 63.3791 62.9166 63.6653C59.5878 67.1936 55.2133 69.8785 50.69 71.595C50.5481 71.649 50.4063 71.7031 50.2601 71.7588C46.7252 73.0778 42.8958 74.0153 39.1073 74.0376C38.9592 74.0389 38.8111 74.0402 38.6585 74.0415C38.1827 74.0447 37.707 74.0459 37.2313 74.0462C37.0689 74.0464 36.9065 74.0465 36.7391 74.0466C34.3764 74.0437 32.0972 73.9714 29.785 73.445C29.6365 73.4132 29.488 73.3815 29.335 73.3488C23.8795 72.1698 18.5157 69.8705 14.245 66.23C14.0275 66.0629 14.0275 66.0629 13.8056 65.8925C11.1727 63.8496 8.74499 61.3845 6.845 58.645C6.77111 58.5413 6.69721 58.4376 6.62107 58.3308C2.66534 52.7722 0.0276029 45.8112 -0.0440782 38.9367C-0.0458984 38.7914 -0.0477187 38.6462 -0.0495941 38.4965C-0.111297 32.2888 0.729029 26.5242 3.515 20.905C3.58437 20.7623 3.65374 20.6195 3.72521 20.4725C6.32008 15.1682 10.199 10.5012 14.985 7.02999C15.089 6.95383 15.193 6.87767 15.3001 6.79919C21.6181 2.22549 29.1204 -0.0875896 36.8844 -0.0693819ZM14.7036 13.6071C14.4367 13.8684 14.1657 14.1254 13.8945 14.3823C7.99726 20.0734 4.80033 28.2874 4.57261 36.4069C4.50094 42.1087 5.99335 47.552 8.695 52.54C8.75766 52.6561 8.82032 52.7722 8.88488 52.8918C9.96544 54.8626 11.3079 56.5698 12.765 58.275C12.9233 58.4603 12.9233 58.4603 13.0849 58.6493C13.3479 58.9565 13.6114 59.2633 13.875 59.57C14.2684 58.9799 14.4802 58.4294 14.7306 57.7662C17.0182 51.9408 21.2498 47.7149 26.825 44.955C26.825 44.8329 26.825 44.7108 26.825 44.585C26.5013 44.3005 26.5013 44.3005 26.085 44.0069C22.525 41.2924 20.3381 37.1594 19.6873 32.7566C19.1319 27.9027 20.433 23.0837 23.4527 19.2323C26.0895 16.0257 29.97 13.7956 34.092 13.1935C39.5517 12.729 44.3637 13.864 48.655 17.39C51.6822 20.02 53.6258 23.8016 54.205 27.75C54.3661 30.5623 54.4544 33.4064 53.465 36.075C53.4213 36.1956 53.3777 36.3162 53.3327 36.4404C52.1518 39.6282 50.0194 42.6784 47.175 44.585C47.4636 45.1622 47.9628 45.2642 48.5394 45.5331C49.7959 46.1424 50.8925 46.8551 51.985 47.73C52.0861 47.8094 52.1872 47.8888 52.2914 47.9705C55.8778 50.8055 58.7863 54.9217 59.94 59.385C61.0378 58.9459 61.6414 57.8841 62.345 56.98C62.4836 56.805 62.6221 56.6299 62.7649 56.4496C67.9605 49.7344 70.2015 41.1559 69.1438 32.7421C67.9596 24.3934 63.5969 16.6024 56.8991 11.4122C44.1789 2.03533 26.251 2.27267 14.7036 13.6071ZM27.4053 22.8049C25.3273 25.4603 24.5153 28.4808 24.79 31.82C25.2807 35.2652 27.014 38.221 29.785 40.33C32.5658 42.2398 35.9084 43.0226 39.2467 42.43C42.5054 41.7437 45.2475 39.9356 47.1743 37.2161C49.0243 34.2913 49.6791 31.0329 49.0134 27.6344C48.1836 24.5052 46.1603 21.6052 43.3601 19.9366C41.6246 18.9557 39.9207 18.2884 37.925 18.13C37.7479 18.1153 37.7479 18.1153 37.5673 18.1004C33.5842 17.9272 29.9675 19.8492 27.4053 22.8049ZM22.7088 54.2628C20.751 56.584 18.485 60.1668 18.5022 63.296C18.7986 63.8538 19.3091 64.0998 19.8413 64.4031C19.9632 64.474 20.0851 64.5449 20.2107 64.618C27.9502 69.0254 36.8196 70.5321 45.5013 68.2122C48.7703 67.2762 51.9256 65.8895 54.76 64.01C54.9064 63.9168 55.0529 63.8235 55.2037 63.7274C55.3015 63.6375 55.3993 63.5476 55.5 63.455C55.5578 60.0471 53.4588 56.4677 51.245 54.02C51.044 53.7932 51.044 53.7932 50.8389 53.5618C47.6473 50.1596 42.8281 48.0311 38.1693 47.8774C32.0745 47.7842 26.9146 49.7827 22.7088 54.2628Z"
                fill="black"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_121_181">
                <Rect width={74} height={74} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);
