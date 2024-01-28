module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				// primary: '#fff',
				// secondary: '#235B4E',
				// ternary: '#13322B',
				// navbar: '#0C231E',

				// primary: '#0D47A1',   // Deep blue, signifying depth and professionalism
				// secondary: '#263238', // Dark charcoal, for elegant sophistication
				// ternary: '#37474F',   // Slightly lighter gray for contrast
				// navbar: '#1C313A',    // Deep gray-blue, for a rich background
				// light: '#ECEFF1',

				primary: '#000000',    // Deep, true black for a classic, premium feel
				secondary: '#34495e',  // Dark blue-gray, sophisticated and modern
				ternary: '#7f8c8d',    // Soft, muted gray for balance
				navbar: '#2c3e50',     // Deep navy blue, elegant and timeless
				light: '#ecf0f1',      // Light silver-gray, for a sleek and clean contrast
			},
			height: {
				128: '32rem',
				192: '48rem',
			},
		},
	},
	plugins: [],
	important: true,
};
