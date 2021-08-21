const theme = require("tailwindcss/defaultTheme");
module.exports = {
        purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
        darkMode: false, // or 'media' or 'class'
        theme: {
                extend: {
                        spacing: {
                                ...theme.spacing,
                                112.5: "28.125rem",
                                125: "31.25rem",
                        },
                },
                colors: {
                        ...theme.colors,
                        "red-violet": {
                                DEFAULT: "#E61284",
                                50: "#FDE1F0",
                                100: "#FBC9E4",
                                200: "#F79ACC",
                                300: "#F36BB4",
                                400: "#F03B9C",
                                500: "#E61284",
                                600: "#B70E69",
                                700: "#870B4E",
                                800: "#580733",
                                900: "#290317",
                        },
                        "blue-gem": {
                                DEFAULT: "#5B1096",
                                50: "#CB98F4",
                                100: "#C080F2",
                                200: "#A952ED",
                                300: "#9224E8",
                                400: "#7715C4",
                                500: "#5B1096",
                                600: "#3F0B68",
                                700: "#23063A",
                                800: "#07010C",
                                900: "#000000",
                        },
                },
        },
        variants: {
                extend: {},
        },
        plugins: [],
};
