/**
 * 👁️ SHIVANETRA DATA SUITE - DYNAMIC STORAGE & DISTRIBUTION CONTROLLER
 * Location: data/data_collector.js
 * Implementation: Handles 'Collect, Store, and Reflect' data routing architecture safely.
 */

// 🛠️ CONNECT FIX: Changed path from relative './' to explicit file grouping path
import { executeSuryaSiddhantaEngine } from './surya_engine.js';

/**
 * CORE DATA COLLECTION AND PACKAGING LIFECYCLE
 * Safely processes timeline calculations, saves entries locally, and transmits data to the views
 */
export async function processUnifiedMetaphysicalData(name, d, m, y, time, place) {
  let hrs = 12;
  let mins = 0;
  
  if (time && time.includes(":")) {
    const tSplit = time.split(":");
    hrs = tSplit[0] ? parseInt(tSplit[0], 10) : 12;
    mins = tSplit[1] ? parseInt(tSplit[1], 10) : 0;
  }

  // 1. COLLECT: Initialize the robust mathematical engine
  const astroReport = executeSuryaSiddhantaEngine(parseInt(y, 10), parseInt(m, 10), parseInt(d, 10), hrs, mins);
  const dataNode = astroReport.planetaryPlacements;

  // Fetch structural configurations from database file path
  let configMap = { templates: { surya_log_header: "AHARGANA COUNT: {{ahargana}}\nORIGIN SECTOR: {{place}}\nTIME STAMP REF: {{time}}\n\n" } };
  try {
    const res = await fetch('./data/calculator.json');
    if (res.ok) {
      configMap = await res.json();
    }
  } catch (e) {
    console.warn("Using fallback structural templates due to database path block.", e);
  }

  // 2. REFLECT: Format variables and transmit cleanly to Page 2 targets
  let formattedLog = configMap.templates.surya_log_header
    .replace("{{ahargana}}", astroReport.calculatedAhargana)
    .replace("{{place}}", place.toUpperCase())
    .replace("{{time}}", `${hrs}:${mins < 10 ? '0' + mins : mins}`);

  formattedLog += `Sun Position: ${dataNode.Sun.rashiName} (${dataNode.Sun.degrees}°)\n` +
                  `Moon Position: ${dataNode.Moon.rashiName} (${dataNode.Moon.degrees}°)\n` +
                  `Mars Position: ${dataNode.Mars.rashiName} (${dataNode.Mars.degrees}°)\n` +
                  `Mercury Position: ${dataNode.Mercury.rashiName} (${dataNode.Mercury.degrees}°)`;

  const logBox = document.getElementById("surya-log");
  if (logBox) logBox.innerText = formattedLog;

  // Safely update chart matrix boxes on the viewport
  const updateElementHTML = (id, content) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = content;
  };

  updateElementHTML("nc-11", `Ju / Me<br><span style='font-size:8px;color:#48BB78;font-weight:900;'>${dataNode.Jupiter.rashiName}</span>`);
  updateElementHTML("nc-3", `Su / Ve<br><span style='font-size:8px;color:#48BB78;font-weight:900;'>${dataNode.Sun.rashiName}</span>`);
  updateElementHTML("nc-9", `Sa / Ra<br><span style='font-size:8px;color:#e53e3e;font-weight:900;'>${dataNode.Saturn.rashiName}</span>`);

  // 3. STORE: Append coordinates to portfolio registry
  const databaseSaveKey = `${y}${m}${d}`;
  let portfolioDb = {};
  
  try {
    if (localStorage.getItem("shivanetra_portfolio")) {
      portfolioDb = JSON.parse(localStorage.getItem("shivanetra_portfolio"));
    }
  } catch (err) {
    console.error("Local storage allocation check failed:", err);
  }

  portfolioDb[databaseSaveKey] = {
    identity: name,
    timestamp: new Date().toISOString(),
    calculations: dataNode
  };

  localStorage.setItem("shivanetra_portfolio", JSON.stringify(portfolioDb));
  console.log(`🚀 [Portfolio Engine] Node ${databaseSaveKey} saved.`);
}
