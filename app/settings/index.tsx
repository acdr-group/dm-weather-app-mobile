import React from 'react';
import {SafeAreaView, ScrollView, Text} from "react-native";
import {Stack} from "expo-router";
import PageWrapperComponent from "../../components/shared/PageWrapperComponent";
import {PageTitle} from "../../context/PageContext";

type Props = {

}
const Settings: React.FC<Props> = (props: Props) => {
  return (
    <SafeAreaView>
        <Stack.Screen
            options={{
                headerTransparent: true,
            }}
        />
        <ScrollView>
            <PageWrapperComponent title={PageTitle.SETTINGS_PAGE_TITLE}>
                <Text>
                    Hier kommen all die Einstellungen wie Theme, Farben, Rechtenverwaltungen, Info über die App, usw.
                </Text>
            </PageWrapperComponent>
        </ScrollView>
        <Text>Settings Seite</Text>
    </SafeAreaView>
  )
}

export default Settings
