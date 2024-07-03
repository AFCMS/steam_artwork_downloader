import type {Config} from "tailwindcss";
import plugin_forms from "@tailwindcss/forms"

// noinspection JSUnusedGlobalSymbols
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [plugin_forms],
} satisfies Config;

