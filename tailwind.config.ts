import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FEFBF6',
        cream: '#FDF7EF',
        // Crème des illustrations de bandeau : c'est la teinte du papier sur
        // les dessins fournis. Le bandeau prend exactement la même, pour que
        // l'illustration ne se détache pas du fond.
        paper: '#FDF9F2',
        sage: {
          DEFAULT: '#788568',
          dark: '#5F6B51',
          // Vert profond réservé aux grands blocs à fond plein : il permet
          // d'écrire en blanc (7,4:1) et en vert pâle (5,6:1) au-dessus,
          // ce que le vert sauge d'origine ne permettait pas (3,9:1).
          deep: '#4E583F',
          light: '#A5AE8A',
          pale: '#DCE1D2',
        },
        terracotta: {
          // Couleur identitaire exacte de la charte. Réservée aux éléments
          // graphiques (traits, formes, bordures, aplats décoratifs) : sur
          // fond ivoire elle ne dépasse pas 2,9:1 de contraste, elle ne peut
          // donc pas porter de texte ni de bouton (cf. § Accessibilité).
          DEFAULT: '#D98262',
          dark: '#C26A4B',
          light: '#E9A88E',
          // Versions assombries utilisées pour TOUT le texte terracotta et les
          // boutons pleins : 4,7:1 sur ivoire et en blanc sur fond plein,
          // soit le niveau AA du WCAG. Pour revenir strictement à la charte,
          // remplacer ces deux valeurs par #D98262 et #C26A4B — le site sera
          // fidèle au nuancier mais ne passera plus le critère de contraste.
          deep: '#B05836',
          deeper: '#9C4C2E',
        },
        peach: '#F3D5C4',
        sand: '#E8D8C5',
        gold: '#D9A45B',
        // Accents illustratifs de la charte : ils habillent les icônes et les
        // visuels, jamais un texte courant (voir la note sur les contrastes).
        mustard: {
          DEFAULT: '#E8B44A',
          soft: '#F6DFA8',
          ink: '#8A6320',
        },
        coral: {
          DEFAULT: '#E8837C',
          soft: '#FBE0DC',
          ink: '#B1443C',
        },
        lilac: {
          DEFAULT: '#B9A7D6',
          soft: '#EDE6F6',
          ink: '#6B589A',
        },
        blush: '#FBEEEA',
        ink: {
          DEFAULT: '#66584B',
          // Assombri d'un demi-ton par rapport à la charte : le texte
          // secondaire doit rester au niveau AA même posé sur les fonds
          // teintés (bandeau lettre d'information, encarts crème).
          soft: '#756759',
        },
        // Gris beige de la charte (#91877B) légèrement assombri : la teinte
        // d'origine ne donnait que 3,4:1 sur fond ivoire, insuffisant pour du
        // texte secondaire. À 4,7:1, la nuance reste douce et devient lisible.
        muted: '#736860',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Nunito Sans', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'Dancing Script', 'cursive'],
      },
      fontSize: {
        // Tailles des titres. Calibrées pour la typographie manuscrite
        // (voir `.title` dans globals.css) : hauteur d'œil plus petite qu'un
        // serif, donc corps plus grand et interlignes plus larges — sinon les
        // jambages d'une ligne viennent toucher la ligne suivante.
        'display-xl': ['clamp(2.7rem, 6.2vw, 4.6rem)', { lineHeight: '1.2' }],
        'display-lg': ['clamp(2.3rem, 5.2vw, 3.8rem)', { lineHeight: '1.22' }],
        'display-md': ['clamp(1.9rem, 3.7vw, 2.7rem)', { lineHeight: '1.28' }],
        'display-sm': ['clamp(1.5rem, 2.7vw, 1.95rem)', { lineHeight: '1.35' }],
        // Titres éditoriaux (Cormorant Garamond, voir `.title-editorial`).
        // xl : 32 px sur mobile, 44 px sur grand écran, interligne 1.1.
        'editorial-xl': ['clamp(2rem, 3.2vw, 2.75rem)', { lineHeight: '1.1' }],
        'editorial-lg': ['clamp(1.7rem, 2.4vw, 2.05rem)', { lineHeight: '1.12' }],
        'editorial-md': ['clamp(1.3rem, 1.7vw, 1.5rem)', { lineHeight: '1.16' }],
      },
      borderRadius: {
        soft: '0.875rem',
        card: '1.25rem',
        xl2: '1.75rem',
        blob: '62% 38% 55% 45% / 48% 52% 48% 52%',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(102, 88, 75, 0.04), 0 8px 24px -12px rgba(102, 88, 75, 0.14)',
        lift: '0 2px 4px rgba(102, 88, 75, 0.05), 0 18px 40px -18px rgba(102, 88, 75, 0.22)',
        inset: 'inset 0 0 0 1px rgba(102, 88, 75, 0.07)',
      },
      maxWidth: {
        shell: '77rem',
        prose: '44rem',
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'drift': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-7px) rotate(1.5deg)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        drift: 'drift 9s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s cubic-bezier(0.22, 0.61, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
