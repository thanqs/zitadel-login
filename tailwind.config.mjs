import colors from "tailwindcss/colors";

// Generate dynamic theme colors
let themeColors = {
  background: { light: { contrast: {} } },
  primary: { light: { contrast: {} } },
  warn: { light: { contrast: {} }},
  text: { light: { contrast: {} } },
  link: { light: { contrast: {} } },
};

const shades = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];
const themes = ["light"];
const types = ["background", "primary", "warn", "text", "link"];

types.forEach((type) => {
  themes.forEach((theme) => {
    shades.forEach((shade) => {
      themeColors[type][theme][shade] =
        `var(--theme-${theme}-${type}-${shade})`;
      themeColors[type][theme][`contrast-${shade}`] =
        `var(--theme-${theme}-${type}-contrast-${shade})`;
      themeColors[type][theme][`secondary-${shade}`] =
        `var(--theme-${theme}-${type}-secondary-${shade})`;
    });
  });
});

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "false",
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      // https://vercel.com/design/color
      fontSize: {
        "12px": "12px",
        "14px": "14px",
      },
      colors: {
        gray: colors.zinc,
        // Dynamic theme colors
        ...themeColors,
        state: {
          success: {
            light: {
              background: "#cbf4c9",
              color: "#0e6245",
            },
          },
          error: {
            light: {
              background: "#ffc1c1",
              color: "#620e0e",
            },
          },
          neutral: {
            light: {
              background: "#e4e7e4",
              color: "#000000",
            },
          },
          alert: {
            light: {
              background: "#fbbf24",
              color: "#92400e",
            },
          },
        },
      },
      animation: {
        shake: "shake .8s cubic-bezier(.36,.07,.19,.97) both;",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },

          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },

          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },

          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
