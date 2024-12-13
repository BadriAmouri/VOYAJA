import { grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#4EB7AC", // Updated primary color
    },
    mainColor: "#0b0f19",
    accent: {
      greenish: "#81D3C1", // A lighter shade of #4EB7AC
      purplish: "#86BDBB", // A muted complementary color
      orangish: "#F8BFA4", // A warm contrast to balance
    },
    sidebar: {
      background: "#0D3533", // A darker version of #4EB7AC
      hoverBg: "#145B57", // A slightly brighter hover background
      hoverMobile: "#3A7972", // Another complement for mobile
      textColor: "#A9CAC7", // Softer text color to match the theme
    },
    status: {
      red: "#FF6F6F", // Updated to harmonize with the teal theme
      orange: "#FFB981", // Muted orange that blends well
      green: "#4EB7AC", // Reusing the primary color for consistency
    },

    ...(mode === "light"
      ? {
          // Palette values for light mode
          background: {
            default: "#EAF5F4", // Lighter teal background
            paper: "#FFFFFF", // Neutral paper
          },
          text: {
            primary: "#406E6A", // Teal-based text for readability
            secondary: grey[700],
          },
          divider: "rgba(78, 183, 172, 0.1)", // Soft teal divider
          chatBox: "#D6EBE9", // Muted teal for chat box
        }
      : {
          // Palette values for dark mode
          background: {
            default: "#0B2422", // Darker teal shade
            paper: "#123231", // Paper with teal tones
          },
          text: {
            primary: "#A9CAC7", // Adjusted for dark mode readability
            secondary: "#EAF5F4",
          },
          divider: "rgba(78, 183, 172, 0.2)", // Slightly stronger divider
          chatBox: "#184644", // Darker chat box for dark mode
        }),
  },
  typography: {
    allVariants: {
      textAlign: "left", // Global centering
    },
  },
});
