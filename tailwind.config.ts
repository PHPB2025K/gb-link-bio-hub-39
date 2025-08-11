import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'gb-gray': 'hsl(var(--gb-gray))',
				'gb-green': 'hsl(var(--gb-green))',
				'gb-green-hover': 'hsl(var(--gb-green-hover))',
				'gb-green-light': 'hsl(var(--gb-green-light))'
			},
			fontFamily: {
				'antonio': ['Antonio', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				// Ultra-smooth slide animation using transform3d for hardware acceleration
				'smooth-slide-in': {
					'0%': {
						transform: 'translate3d(24px, 0, 0)',
						opacity: '0'
					},
					'100%': {
						transform: 'translate3d(0, 0, 0)',
						opacity: '1'
					}
				},
				// Performance-optimized fade
				'fade-in-smooth': {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, 8px, 0)'
					},
					'100%': {
						opacity: '1',
						transform: 'translate3d(0, 0, 0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				
				// Ultra-smooth slide animations with optimized timing (≤ 400ms total)
				'smooth-slide-1': 'smooth-slide-in 320ms cubic-bezier(0.22, 0.61, 0.36, 1) 0ms both',
				'smooth-slide-2': 'smooth-slide-in 320ms cubic-bezier(0.22, 0.61, 0.36, 1) 80ms both',
				'smooth-slide-3': 'smooth-slide-in 320ms cubic-bezier(0.22, 0.61, 0.36, 1) 160ms both',
				'smooth-slide-4': 'smooth-slide-in 320ms cubic-bezier(0.22, 0.61, 0.36, 1) 240ms both',
				'smooth-slide-5': 'smooth-slide-in 320ms cubic-bezier(0.22, 0.61, 0.36, 1) 320ms both',
				'smooth-slide-6': 'smooth-slide-in 320ms cubic-bezier(0.22, 0.61, 0.36, 1) 400ms both',
				
				// Performance-optimized fade
				'fade-smooth': 'fade-in-smooth 300ms cubic-bezier(0.22, 0.61, 0.36, 1) both'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
