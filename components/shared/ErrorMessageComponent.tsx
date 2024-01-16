import React from 'react';
import {Text, View} from "react-native";

type Props = {
    reason: string,
}

/**
 * Component to display an error message.
 *
 * @component
 * @example
 * <ErrorMessageComponent reason="Network error" />
 *
 * @param {Object} props - The props object containing the error message.
 * @param {string} props.reason - The reason for the error.
 *
 * @returns {ReactNode} - The rendered error message component.
 */
const ErrorMessageComponent: React.FC<Props> = (props: Props) => {
  return (
    <View>
        <Text>An unexpected error occurred {props.reason}</Text>
        <Text>{props.reason}</Text>
    </View>
  )
}

export default ErrorMessageComponent
