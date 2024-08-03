import { default as myTheme } from "@/assets/custom-theme.json";
import { SessionProvider } from "@/auth/ctx";
import { useColorScheme } from "@/hooks/useColorScheme";
import "@/i18n";
import { FeatherIconsPack } from "@/icons/feather-icons";
import { FontAwesomeIconsPack } from "@/icons/font-awesome-icons";
import { MaterialCommunityIconsPack } from "@/icons/material-community-icons";
import * as eva from "@eva-design/eva";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import {
  DefaultTheme as PaperDefaultTheme,
  PaperProvider,
} from "react-native-paper";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const theme = {
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: myTheme["color-primary-500"],
      secondary: myTheme["color-primary-600"],
    },
  };

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;
  return (
    <SessionProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <PaperProvider theme={theme}>
          <IconRegistry
            icons={[
              EvaIconsPack,
              FeatherIconsPack,
              MaterialCommunityIconsPack,
              FontAwesomeIconsPack,
            ]}
          />
          <ApplicationProvider
            {...eva}
            theme={{
              ...(colorScheme === "dark" ? eva.dark : eva.light),
              ...myTheme,
            }}
          >
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
                <Stack.Screen name="admin" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </ThemeProvider>
          </ApplicationProvider>
        </PaperProvider>
      </SafeAreaView>
    </SessionProvider>
  );
}
