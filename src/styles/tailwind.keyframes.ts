const keyframes = {
  'slide-down': {
    '0%': { opacity: '0', transform: 'translateY(-10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  'slide-up': {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(-10px)' },
  },
  'open': {
    from: { opacity: '0%', transform: 'translateY(-20px)' },
    to: { opacity: '100%', transform: 'translateY(0)' },
  },
  'close': {
    from: { opacity: '100%', transform: 'translateY(0)' },
    to: { opacity: '0%', transform: 'translateY(-20px)' },
  },
  'fade-in-dropdown': {
    '0%': { opacity: '0', transform: 'translateY(-10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  'fade-out-dropdown': {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(-20px)' },
  },
  'skeleton': {
    '0%': { opacity: '1' },
    '50%': { opacity: '0.5' },
    '100%': { opacity: '1' },
  },
  'ping': {
    '0%': {
      opacity: '1',
      transform: 'scale(1)',
    },
    '75%': {
      opacity: '0',
      transform: 'scale(2)',
    },
    '100%': {
      opacity: '0',
      transform: 'scale(2)',
    },
  },
  'slideInFromLeft': {
    from: {
      opacity: '0',
      transform: 'translateX(10px)',
    },
    to: {
      opacity: '1',
      transform: 'translateX(0)',
    },
  },
  'bounce': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '30%': {
      transform: 'translateY(-30px)',
    },
    '60%': {
      transform: 'translateY(10px)',
    },
    '80%': {
      transform: 'translateY(0px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
  'animateTop': {
    '25%': { width: '100%', opacity: '1' },
    '30%, 100%': { opacity: '0' },
  },
  'animateBottom': {
    '0%, 50%': { opacity: '0', width: '0' },
    '75%': { opacity: '1', width: '100%' },
    '76%, 100%': { opacity: '0' },
  },
  'animateRight': {
    '0%, 25%': { opacity: '0', height: '0' },
    '50%': { opacity: '1', height: '100%' },
    '55%, 100%': { opacity: '0', height: '100%' },
  },
  'animateLeft': {
    '0%, 75%': { opacity: '0', height: '0' },
    '100%': { opacity: '1', height: '100%' },
  },
};

export default keyframes;
