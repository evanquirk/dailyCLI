export function getMoonPhaseName(moonPhase) {
  if (moonPhase === 0 || moonPhase === 1) {
      return '🌑 New Moon';
  } else if (moonPhase > 0 && moonPhase < 0.25) {
      return '🌒 Waxing Crescent';
  } else if (moonPhase === 0.25) {
      return '🌓 First Quarter';
  } else if (moonPhase > 0.25 && moonPhase < 0.5) {
      return '🌔 Waxing Gibbous';
  } else if (moonPhase === 0.5) {
      return '🌕 Full Moon';
  } else if (moonPhase > 0.5 && moonPhase < 0.75) {
      return '🌖 Waning Gibbous';
  } else if (moonPhase === 0.75) {
      return '🌗 Last Quarter';
  } else if (moonPhase > 0.75 && moonPhase < 1) {
      return '🌘 Waning Crescent';
  }
  return 'Moon Phase Unknown';
}

export default getMoonPhaseName;