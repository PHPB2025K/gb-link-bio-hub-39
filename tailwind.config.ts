
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
				// OPÇÃO 1: Slide com Bounce Suave
				'slide-bounce-gentle': {
					'0%': {
						transform: 'translateX(100%)',
						opacity: '0'
					},
					'60%': {
						transform: 'translateX(-5px)',
						opacity: '1'
					},
					'80%': {
						transform: 'translateX(2px)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				},
				// NOVA OPÇÃO: Smooth Slide (mais devagar e suave)
				'smooth-slide': {
					'0%': {
						transform: 'translateX(60px)',
						opacity: '0'
					},
					'50%': {
						transform: 'translateX(-2px)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				// OPÇÃO 2: Fade com Scale Elegante
				'fade-scale-up': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.8) translateY(20px)'
					},
					'50%': {
						opacity: '0.7',
						transform: 'scale(1.05) translateY(-5px)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1) translateY(0)'
					}
				},
				// OPÇÃO 3: Slide Diagonal com Rotation
				'slide-diagonal-rotate': {
					'0%': {
						transform: 'translateX(50px) translateY(-30px) rotate(5deg)',
						opacity: '0'
					},
					'70%': {
						transform: 'translateX(-3px) translateY(2px) rotate(-1deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(0) translateY(0) rotate(0deg)'
					}
				},
				// OPÇÃO 4: Wave Effect (Ondulação)
				'wave-slide': {
					'0%': {
						transform: 'translateY(30px) skewY(5deg)',
						opacity: '0'
					},
					'30%': {
						transform: 'translateY(-5px) skewY(-2deg)',
						opacity: '0.8'
					},
					'60%': {
						transform: 'translateY(3px) skewY(1deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(0) skewY(0deg)'
					}
				},
				// OPÇÃO 5: Flip Card Effect
				'flip-slide': {
					'0%': {
						transform: 'rotateY(90deg) translateX(50px)',
						opacity: '0'
					},
					'50%': {
						transform: 'rotateY(45deg) translateX(10px)',
						opacity: '0.5'
					},
					'100%': {
						transform: 'rotateY(0deg) translateX(0px)',
						opacity: '1'
					}
				},
				// OPÇÃO 6: Elastic Bounce
				'elastic-bounce': {
					'0%': {
						transform: 'scale(0) translateX(-100px)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.2) translateX(10px)',
						opacity: '0.8'
					},
					'70%': {
						transform: 'scale(0.9) translateX(-5px)',
						opacity: '1'
					},
					'85%': {
						transform: 'scale(1.05) translateX(2px)'
					},
					'100%': {
						transform: 'scale(1) translateX(0px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				
				// OPÇÃO 1: Slide Bounce Gentle
				'slide-bounce-1': 'slide-bounce-gentle 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'slide-bounce-2': 'slide-bounce-gentle 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s both',
				'slide-bounce-3': 'slide-bounce-gentle 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both',
				'slide-bounce-4': 'slide-bounce-gentle 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.45s both',
				'slide-bounce-5': 'slide-bounce-gentle 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both',
				'slide-bounce-6': 'slide-bounce-gentle 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.75s both',

				// NOVA OPÇÃO: Smooth Slide (mais devagar)
				'smooth-slide-1': 'smooth-slide 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
				'smooth-slide-2': 'smooth-slide 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s both',
				'smooth-slide-3': 'smooth-slide 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.4s both',
				'smooth-slide-4': 'smooth-slide 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.6s both',
				'smooth-slide-5': 'smooth-slide 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.8s both',
				'smooth-slide-6': 'smooth-slide 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 1.0s both',

				// OPÇÃO 2: Fade Scale Up
				'fade-scale-1': 'fade-scale-up 0.6s ease-out',
				'fade-scale-2': 'fade-scale-up 0.6s ease-out 0.1s both',
				'fade-scale-3': 'fade-scale-up 0.6s ease-out 0.2s both',
				'fade-scale-4': 'fade-scale-up 0.6s ease-out 0.3s both',
				'fade-scale-5': 'fade-scale-up 0.6s ease-out 0.4s both',
				'fade-scale-6': 'fade-scale-up 0.6s ease-out 0.5s both',

				// OPÇÃO 3: Slide Diagonal Rotate
				'diagonal-1': 'slide-diagonal-rotate 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'diagonal-2': 'slide-diagonal-rotate 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.12s both',
				'diagonal-3': 'slide-diagonal-rotate 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.24s both',
				'diagonal-4': 'slide-diagonal-rotate 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.36s both',
				'diagonal-5': 'slide-diagonal-rotate 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.48s both',
				'diagonal-6': 'slide-diagonal-rotate 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.6s both',

				// OPÇÃO 4: Wave Effect
				'wave-1': 'wave-slide 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'wave-2': 'wave-slide 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s both',
				'wave-3': 'wave-slide 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both',
				'wave-4': 'wave-slide 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.45s both',
				'wave-5': 'wave-slide 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both',
				'wave-6': 'wave-slide 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.75s both',

				// OPÇÃO 5: Flip Slide
				'flip-1': 'flip-slide 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				'flip-2': 'flip-slide 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s both',
				'flip-3': 'flip-slide 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s both',
				'flip-4': 'flip-slide 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s both',
				'flip-5': 'flip-slide 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s both',
				'flip-6': 'flip-slide 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s both',

				// OPÇÃO 6: Elastic Bounce
				'elastic-1': 'elastic-bounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'elastic-2': 'elastic-bounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.1s both',
				'elastic-3': 'elastic-bounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s both',
				'elastic-4': 'elastic-bounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s both',
				'elastic-5': 'elastic-bounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s both',
				'elastic-6': 'elastic-bounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.5s both'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
