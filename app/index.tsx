import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native"
import HomePageInfoCards from "../components/HomePageInfoCards";
import {Stack} from "expo-router";
import {COLORS} from "../constatnts";
import React, {useState} from "react";
import {PageTitle} from "../context/PageContext";
import PageWrapperComponent from "../components/shared/PageWrapperComponent";

const Home: React.FC = () => {

    const [isPageTitleVisible, setIsPageTitleVisible] = useState<boolean>(false)

    const checkIfPageTitleHasBeenScrollOffScreen = (event) => {
        const scrollY = event.nativeEvent.contentOffset.y
        setIsPageTitleVisible(scrollY < 40)
    }

    return (
        <SafeAreaView style={styles.pageContainer}>
            <StatusBar
                barStyle={isPageTitleVisible ? "dark-content" : "light-content"}
                animated
            />
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerStyle: {
                        ...styles.headerStyle,
                        backgroundColor: isPageTitleVisible ? COLORS.white : COLORS.primary,
                    },
                    headerTintColor: isPageTitleVisible ? undefined : COLORS.white,
                    headerShadowVisible: false,
                    headerTitle: isPageTitleVisible ? "" : PageTitle.START_PAGE_TITLE,
                }}
            />
            <ScrollView
                onScroll={checkIfPageTitleHasBeenScrollOffScreen}
                scrollEventThrottle={32}
            >
                <PageWrapperComponent title={PageTitle.START_PAGE_TITLE}>
                    <HomePageInfoCards/>
                </PageWrapperComponent>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerStyle: {

    },
})

export default Home;
