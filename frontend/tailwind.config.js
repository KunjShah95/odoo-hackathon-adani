/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary Brand Colors
                primary: {
                    DEFAULT: 'hsl(217, 91%, 50%)',
                    light: 'hsl(213, 94%, 60%)',
                    dark: 'hsl(221, 83%, 43%)',
                    muted: 'hsl(217, 33%, 85%)',
                },
                // Surface System - Light Blue Theme
                surface: {
                    DEFAULT: 'hsl(210, 40%, 95%)',
                    light: 'hsl(210, 35%, 92%)',
                    dark: 'hsl(210, 50%, 96%)',
                    elevated: 'hsl(0, 0%, 100%)',
                },
                // Semantic Colors
                success: {
                    DEFAULT: 'hsl(142, 71%, 40%)',
                    muted: 'hsl(142, 35%, 90%)',
                },
                warning: {
                    DEFAULT: 'hsl(38, 92%, 45%)',
                    muted: 'hsl(38, 45%, 90%)',
                },
                danger: {
                    DEFAULT: 'hsl(0, 72%, 48%)',
                    muted: 'hsl(0, 40%, 92%)',
                },
                info: {
                    DEFAULT: 'hsl(199, 89%, 45%)',
                    muted: 'hsl(199, 40%, 92%)',
                },
                // Text Hierarchy - Dark text for light background
                text: {
                    primary: 'hsl(220, 30%, 15%)',
                    secondary: 'hsl(220, 15%, 40%)',
                    tertiary: 'hsl(217, 10%, 55%)',
                    disabled: 'hsl(215, 8%, 70%)',
                },
                // Border System - Subtle for light theme
                border: {
                    subtle: 'hsl(210, 20%, 88%)',
                    default: 'hsl(210, 18%, 82%)',
                    prominent: 'hsl(210, 15%, 75%)',
                },
                // Legacy compatibility
                secondary: {
                    DEFAULT: '#64748b',
                    light: '#94a3b8',
                },
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            fontSize: {
                '2xs': ['0.625rem', { lineHeight: '1rem' }],
                'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'mesh-gradient': 'linear-gradient(135deg, hsl(217, 91%, 60%, 0.1) 0%, transparent 50%, hsl(199, 89%, 48%, 0.05) 100%)',
            },
            boxShadow: {
                'glow': '0 0 20px hsl(217, 91%, 60%, 0.3)',
                'glow-lg': '0 0 40px hsl(217, 91%, 60%, 0.4)',
                'glow-xl': '0 0 60px hsl(217, 91%, 60%, 0.5)',
                'inner-glow': 'inset 0 0 20px hsl(217, 91%, 60%, 0.1)',
                'elevation-1': '0 2px 8px -2px hsl(222, 47%, 2%, 0.2), 0 4px 16px -4px hsl(222, 47%, 2%, 0.15)',
                'elevation-2': '0 4px 16px -4px hsl(222, 47%, 2%, 0.25), 0 8px 32px -8px hsl(222, 47%, 2%, 0.2)',
                'elevation-3': '0 8px 24px -4px hsl(222, 47%, 2%, 0.3), 0 16px 48px -8px hsl(222, 47%, 2%, 0.25)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'fade-in-down': 'fadeInDown 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'slide-up': 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'slide-down': 'slideDown 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                'scale-in': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'shake': 'shake 0.6s ease-in-out',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite',
                'spin-slow': 'spinSlow 8s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-24px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(24px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px hsla(217, 91%, 60%, 0.3)' },
                    '100%': { boxShadow: '0 0 40px hsla(217, 91%, 60%, 0.5)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px hsla(217, 91%, 60%, 0.3)' },
                    '50%': { boxShadow: '0 0 40px hsla(217, 91%, 60%, 0.5)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                spinSlow: {
                    'from': { transform: 'rotate(0deg)' },
                    'to': { transform: 'rotate(360deg)' },
                },
            },
            transitionDuration: {
                'fast': '150ms',
                'normal': '250ms',
                'slow': '400ms',
            },
            transitionTimingFunction: {
                'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            },
        },
    },
    plugins: [],
}
