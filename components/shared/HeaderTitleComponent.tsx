import React from 'react';
import {Text, View} from "react-native";
import {COLORS, FONT_SIZE} from "../../constatnts";

type Props = {
    title: string
}

const HeaderTitleComponent: React.FC<Props> = (props: Props) => {
    const { title } = props;
    return (
        <View>
            <Text
                style={{
                    color: COLORS.white,
                    fontSize: FONT_SIZE.medium,
                    fontWeight: "500",
                }}
            >
                {title}
            </Text>
        </View>
    )
}

export default HeaderTitleComponent
