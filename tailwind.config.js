module.exports = {
	mode: 'jit',
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				dark1: '#151B31',
				dark2: '#1A2037',
				dark3: '#232B41',
				dark4: '#2F3651'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
