import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MenuItem } from "../components/menu/MenuItem";
import { Avatar } from "../components/ui/Avatar";
import { useFavorites } from "../context/FavoritesContext";
import { currentUser } from "../data/user";
import { colors, radius, shadows, spacing, typography } from "../theme";
import { goBack } from "../utils/navigation";

const REPOSITORY_URL = "https://github.com/pedrosh101/noma";

type TabHref = "/" | "/descubra" | "/reviews";
type PageHref = "/profile" | "/favoritos";

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const { favoriteCount } = useFavorites();

  // Abas: `dismissTo` fecha o menu e volta à barra de abas que já existe.
  // (`navigate` é sinônimo de `push` desde o Expo Router v4 e empilharia uma
  // segunda barra de abas por cima da primeira.)
  function goToTab(href: TabHref) {
    router.dismissTo(href as never);
  }

  // Páginas empilhadas: `replace` troca o menu pela página, então o "voltar"
  // da página leva direto às abas, sem passar pelo menu de novo.
  function goToPage(href: PageHref) {
    router.replace(href as never);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        <View style={styles.topBar}>
          <Pressable
            onPress={goBack}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Fechar menu"
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="close" size={22} color={colors.ink} />
          </Pressable>

          <Image
            source={require("../../assets/images/noma-logo.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Noma"
          />

          <View style={styles.closeButton} />
        </View>

        <Pressable
          onPress={() => goToPage("/profile")}
          accessibilityRole="button"
          accessibilityLabel="Abrir perfil e reservas"
          style={({ pressed }) => [styles.profile, pressed && styles.pressed]}
        >
          <Avatar name={currentUser.name} size={56} />
          <View style={styles.profileInfo}>
            <Text style={typography.h1}>{currentUser.name}</Text>
            <Text style={typography.caption}>Ver perfil e reservas</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
        </Pressable>

        <Text style={[typography.label, styles.groupTitle]}>Explorar</Text>
        <MenuItem
          icon="home-outline"
          label="Início"
          onPress={() => goToTab("/")}
        />
        <MenuItem
          icon="compass-outline"
          label="Descubra"
          onPress={() => goToTab("/descubra")}
        />
        <MenuItem
          icon="ribbon-outline"
          label="Reviews"
          onPress={() => goToTab("/reviews")}
        />

        <Text style={[typography.label, styles.groupTitle]}>Sua conta</Text>
        <MenuItem
          icon="heart-outline"
          label="Favoritos"
          badge={favoriteCount}
          onPress={() => goToPage("/favoritos")}
        />
        <MenuItem
          icon="person-outline"
          label="Perfil e reservas"
          onPress={() => goToPage("/profile")}
        />

        <View style={styles.footer}>
          <Text style={typography.caption}>
            O Noma é um projeto de portfólio: uma plataforma fictícia para
            descobrir e reservar experiências gastronômicas.
          </Text>
          <Pressable
            onPress={() => Linking.openURL(REPOSITORY_URL)}
            accessibilityRole="link"
            style={({ pressed }) => [styles.link, pressed && styles.pressed]}
          >
            <Ionicons name="logo-github" size={16} color={colors.ink} />
            <Text style={[typography.label, styles.linkText]}>
              Ver o código no GitHub
            </Text>
          </Pressable>
          <Text style={[typography.caption, styles.version]}>Versão 1.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.paper },
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.soft,
  },
  logo: { height: 28, width: 100 },
  pressed: { opacity: 0.85 },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    ...shadows.soft,
  },
  profileInfo: { flex: 1, marginLeft: spacing.sm },
  groupTitle: {
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: spacing.xl,
    marginBottom: spacing.xxs,
  },
  footer: {
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: spacing.md,
  },
  linkText: { marginLeft: spacing.xs, textDecorationLine: "underline" },
  version: { marginTop: spacing.md },
});
