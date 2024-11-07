import { View } from "react-native";
import { Logo } from "../../common/svg/logo";
import { PropsNavigate } from "../../utils/types";

export const HeaderLeft = () => {
    return (
        <View>
            <Logo width={82} height={82} />
        </View>
    );
};
