/**
 * 👁️ SHIVANETRA METAPHYSICAL SUITE - SURYA SIDDHANTA ENGINE
 * Robust, decoupled computational architecture for ancient solar mechanics.
 */

// Astronomical constants derived directly from traditional Siddhantic constants
const SURYA_CONSTANTS = {
  EPOCH_JULIAN_DAY: 588465.5, // Kali Yuga planetary conjunction epoch base point
  PLANETARY_REVOLUTIONS_PER_MAHAYUGA: {
    Sun: 4320000,
    Moon: 57753336,
    Mars: 2296832,
    Mercury: 17937060,
    Jupiter: 364220,
    Venus: 7022376,
    Saturn: 146568
  },
  PLANET_ECCENTRICITY_DEGREES: {
    Sun: 2.17,
    Moon: 5.08,
    Mars: 11.45,
    Mercury: 4.11,
    Jupiter: 5.05,
    Venus: 1.25,
    Saturn: 7.95
  },
  RASHI_SIGNS: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
};

/**
 * Calculates total elapsed days (Ahargana) from the reference astronomical epoch point
 */
function calculateAhargana(year, month, day) {
  // Convert standard date components to target Gregorian Julian Date equivalent
  const targetDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const julianTime = targetDate.getTime() / 86400000 + 2440587.5;
  
  // Calculate delta distance relative to epoch timeline parameters
  return Math.max(0, julianTime - SURYA_CONSTANTS.EPOCH_JULIAN_DAY);
}

/**
 * Computes the Manda Phala correction equation to simulate true longitudinal degree curves
 */
function applyMandaPhalaCorrection(meanLongitude, planetKey) {
  const eccentricity = SURYA_CONSTANTS.PLANET_ECCENTRICITY_DEGREES[planetKey] || 2.0;
  
  // Approximate standard planetary perigee/apogee alignment nodes
  const planetPerigeeRad = (30 * (Math.PI / 180)); 
  const meanAnomalyRad = (meanLongitude * (Math.PI / 180)) - planetPerigeeRad;
  
  // High-fidelity sine equation modeling traditional Indian trigonometric tables
  const correctionPhala = eccentricity * Math.sin(meanAnomalyRad);
  
  let trueLongitude = (meanLongitude + correctionPhala) % 360;
  if (trueLongitude < 0) trueLongitude += 360;
  
  return trueLongitude;
}

/**
 * CORE EXECUTION LOOP: Maps raw time indices into authentic geocentric Rashi coordinates
 */
export function computeSuryaPlanetaryPositions(year, month, day) {
  const totalElapsedDays = calculateAhargana(year, month, day);
  const totalDaysInMahayuga = 1577917828; // Traditional epoch cycle base interval
  
  const computedPlacementsOutput = {};
  
  // Iterate through core bodies to find orbital degrees
  for (const planetKey in SURYA_CONSTANTS.PLANETARY_REVOLUTIONS_PER_MAHAYUGA) {
    const revolutions = SURYA_CONSTANTS.PLANETARY_REVOLUTIONS_PER_MAHAYUGA[planetKey];
    
    // Calculate Mean Longitude: (Revolutions * Elapsed Days / Total Days) * 360 deg
    const rawMeanDegrees = ((revolutions * totalElapsedDays) / totalDaysInMahayuga) * 360;
    const normalizedMeanDegrees = rawMeanDegrees % 360;
    
    // Apply traditional orbital corrections
    const finalTrueDegrees = applyMandaPhalaCorrection(normalizedMeanDegrees, planetKey);
    
    // Resolve absolute degree into the matching 30-degree Vedic Rashi sector
    const rashiSectorIndex = Math.floor(finalTrueDegrees / 30);
    const residualSignDegrees = Math.round(finalTrueDegrees % 30);
    
    computedPlacementsOutput[planetKey] = {
      absoluteDegrees: parseFloat(finalTrueDegrees.toFixed(2)),
      rashiName: SURYA_CONSTANTS.RASHI_SIGNS[rashiSectorIndex],
      signPositionDegrees: residualSignDegrees
    };
  }
  
  return {
    calculationTimestamp: new Date().toISOString(),
    elapsedEpochDays: Math.round(totalElapsedDays),
    positions: computedPlacementsOutput
  };
}
