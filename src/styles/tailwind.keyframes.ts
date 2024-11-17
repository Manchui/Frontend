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
  'menu-bar1': {
    '0%': { transform: 'translateY(8px) rotate(45deg)' },
    '50%': { transform: 'translateY(8px) rotate(0)' },
    '100%': { transform: 'translateY(0) rotate(0)' },
  },
  'menu-bar2': {
    '0%': { transform: 'translateY(-8px) rotate(-45deg)' },
    '50%': { transform: 'translateY(-8px) rotate(0)' },
    '100%': { transform: 'translateY(0) rotate(0)' },
  },
  'menu-bar3': {
    '0%': { transform: 'translateY(0px) rotate(0)', opacity: '0' },
    '50%': { transform: 'translateY(0px) rotate(0)', opacity: '0' },
    '100%': { transform: 'translateY(0px) rotate(0)', opacity: '100' },
  },
  'active-menu-bar3': {
    '0%': { transform: 'translateY(0px) rotate(0)', opacity: '100' },
    '50%': { transform: 'translateY(0px) rotate(0)', opacity: '100' },
    '100%': { transform: 'translateY(0px) rotate(0)', opacity: '0' },
  },
  'active-menu-bar1': {
    '0%': { transform: 'translateY(0px) rotate(0)' },
    '50%': { transform: 'translateY(8px) rotate(0)' },
    '100%': { transform: 'translateY(8px) rotate(45deg)' },
  },
  'active-menu-bar2': {
    '0%': { transform: 'translateY(0px) rotate(0)' },
    '50%': { transform: 'translateY(-8px) rotate(0)' },
    '100%': { transform: 'translateY(-8px) rotate(-45deg)' },
  },
};

export default keyframes;
