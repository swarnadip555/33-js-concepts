// 🛰️ Swarnadip's Project Telemetry System (Node.js)
// Run using: node telemetry.js

import os from "os";
import readline from "readline";

function clearTerminal() {
  process.stdout.write("\x1Bc"); // ANSI clear screen
}

function generateTelemetry() {
  const cpus = os.cpus();

  // Calculate CPU average usage (approx)
  let idle = 0;
  let total = 0;
  cpus.forEach(cpu => {
    for (let type in cpu.times) {
      total += cpu.times[type];
    }
    idle += cpu.times.idle;
  });
  const cpuUsage = Math.round((1 - idle / total) * 100);

  // Memory usage
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMemPercent = (((totalMem - freeMem) / totalMem) * 100).toFixed(2);

  // Simulated telemetry data
  const temperature = (Math.random() * 50 + 20).toFixed(2); // °C
  const speed = (Math.random() * 120).toFixed(2); // km/h
  const voltage = (Math.random() * 1.5 + 11.5).toFixed(2); // Volts

  return {
    "CPU Usage (%)": cpuUsage,
    "Memory Usage (%)": usedMemPercent,
    "Temperature (°C)": temperature,
    "Speed (km/h)": speed,
    "Battery Voltage (V)": voltage,
    "Timestamp": new Date().toLocaleString()
  };
}

function displayTelemetry(data) {
  console.log("=".repeat(60));
  console.log("🛰️  SWARNADIP'S PROJECT TELEMETRY SYSTEM");
  console.log("=".repeat(60));
  for (const [key, value] of Object.entries(data)) {
    console.log(`${key.padEnd(25)}: ${value}`);
  }
  console.log("=".repeat(60));
}

// Smooth animation for terminal updates
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startTelemetry() {
  while (true) {
    clearTerminal();
    const telemetry = generateTelemetry();
    displayTelemetry(telemetry);
    await sleep(2000); // Update every 2 seconds
  }
}

// Graceful stop
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdin.on("keypress", (_, key) => {
  if (key && (key.name === "c" && key.ctrl)) {
    console.log("\nTelemetry stopped manually. Goodbye 👋");
    process.exit();
  }
});

// Run the telemetry system
startTelemetry();
