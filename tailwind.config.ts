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
				// Uber-style color palette
				uber: {
					black: '#000000',
					white: '#FFFFFF',
					green: '#00B42A',
					'green-dark': '#00A025',
					'gray-50': '#F6F6F6',
					'gray-100': '#E5E5E5',
					'gray-200': '#CCCCCC',
					'gray-300': '#B8B8B8',
					'gray-400': '#A3A3A3',
					'gray-500': '#8A8A8A',
					'gray-600': '#6B6B6B',
					'gray-700': '#4A4A4A',
					'gray-800': '#2A2A2A',
					'gray-900': '#1A1A1A',
				},
				// Keep existing for compatibility
				koffa: {
					'heavy-metal': '#323d2f',
					'snow-drift': '#f1f5ef',
					'sandrift': '#af977b',
					'aqua-forest': '#6aa377',
				},
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
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				uber: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
			},
			fontSize: {
				'uber-xs': ['12px', { lineHeight: '16px' }],
				'uber-sm': ['14px', { lineHeight: '20px' }],
				'uber-base': ['16px', { lineHeight: '24px' }],
				'uber-lg': ['18px', { lineHeight: '28px' }],
				'uber-xl': ['20px', { lineHeight: '30px' }],
				'uber-2xl': ['24px', { lineHeight: '32px' }],
				'uber-3xl': ['30px', { lineHeight: '38px' }],
				'uber-4xl': ['36px', { lineHeight: '44px' }],
			},
			spacing: {
				'uber-xs': '4px',
				'uber-sm': '8px',
				'uber-md': '16px',
				'uber-lg': '24px',
				'uber-xl': '32px',
				'uber-2xl': '48px',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'uber': '12px',
				'uber-lg': '16px',
				'uber-xl': '20px',
			},
			boxShadow: {
				'uber': '0 2px 8px rgba(0, 0, 0, 0.1)',
				'uber-md': '0 4px 12px rgba(0, 0, 0, 0.15)',
				'uber-lg': '0 8px 24px rgba(0, 0, 0, 0.2)',
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
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'slide-up': 'slide-up 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
