import React from 'react';
import {Text, View} from "react-native";

type Props = {
    reason: string,
}

const ErrorMessageComponent: React.FC<Props> = (props: Props) => {
  return (
    <View>
        <Text>An unexpected error occurred when {props.reason}</Text>
        <Text>{props.reason}</Text>
    </View>
  )
}

export default ErrorMessageComponent
