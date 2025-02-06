/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // Enables dark mode using a class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom keyframes for animations
      fontFamily: {
        pacifico: ['"Pacifico"', "cursive"],
        montserrat: ['"Montserrat"', "sans-serif"],
        lobster: ['"Lobster"', "cursive"],
        sriracha: ["Sriracha", "Kanit"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        lora: ["Lora", "serif"],
        quicksand: ["Quicksand", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        sans: ["Noto Sans Bengali", "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
        greatVibes: ["Great Vibes", "serif"],
        robotoCondensed: ["Roboto Condensed", "sans-serif"],
        siliguri: ["Hind Siliguri", "sans-serif"],
      },
      keyframes: {
        dropdown: {
          "0%": { opacity: 0, transform: "translateY(-10px) scale(0.95)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        bounceIn: {
          "0%": { transform: "scale(0.8)", opacity: 0 },
          "50%": { transform: "scale(1.1)", opacity: 0.5 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      // Custom animations that use the keyframes
      animation: {
        dropdown: "dropdown 0.5s ease-in-out",
        fadeIn: "fadeIn 0.4s ease-in-out",
        slideUp: "slideUp 0.6s ease-out",
        bounceIn: "bounceIn 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
      },
      // Customizable border radius for consistent design language
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Custom colors
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  // Plugins for extended functionality
  plugins: [require("tailwindcss-animate"), require("daisyui")],
};
