
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
				'gb-gray': '#EAEAEA',
				'gb-green': '#0d4e4e'
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
				// Nova animação fluida com bounce
				'fluid-slide-bounce': {
					'0%': {
						transform: 'translateX(80px)',
						opacity: '0'
					},
					'70%': {
						transform: 'translateX(-8px)',
						opacity: '1'
					},
					'85%': {
						transform: 'translateX(4px)'
					},
					'95%': {
						transform: 'translateX(-2px)'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				
				// Nova animação fluida - intervalos menores para mais fluidez
				'fluid-slide-1': 'fluid-slide-bounce 1.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0s both',
				'fluid-slide-2': 'fluid-slide-bounce 1.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.1s both',
				'fluid-slide-3': 'fluid-slide-bounce 1.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s both',
				'fluid-slide-4': 'fluid-slide-bounce 1.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.3s both',
				'fluid-slide-5': 'fluid-slide-bounce 1.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.4s both',
				'fluid-slide-6': 'fluid-slide-bounce 1.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0.5s both'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
