import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
// Other available fonts at https://github.com/expo/google-fonts
import {
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
    useFonts,
} from '@expo-google-fonts/roboto';
import BottomNavigationBar from "../components/BottomNavigationBar";

SplashScreen.preventAutoHideAsync()
const Layout = (props: any) => {

    let [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        Roboto_900Black_Italic,
    })

    if (!fontsLoaded) return null

    return (
        <>
            <Stack/>
            <BottomNavigationBar/>
        </>
    )
}
export default Layout;