
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

let monitorProcess = null; // global reference

// These two lines give you __dirname like in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Build the absolute path to your script
const scriptPath = path.join(__dirname, "../../test.sh");

export const startMonitoring = (req, res, next) => 
{
    if (monitorProcess) {
        return res.status(400).json({ message: "Monitoring already running" });
    }

    monitorProcess = spawn("bash", [scriptPath]);

    monitorProcess.stdout.on("data", data => 
    {
        console.log("OUTPUT:", data.toString());
    });

    monitorProcess.stderr.on("data", data => 
    {
        console.error("SCRIPT ERROR:", data.toString());
    });

    monitorProcess.on("close", code => {
        console.log("Monitoring stopped with code", code);
        monitorProcess = null; // reset reference
    });

    res.json({ message: "Monitoring started" });
};


export const stopMonitoring = (req, res, next) => {
    if (!monitorProcess) 
    {
        return res.status(400).json({ message: "Monitoring is not running" });
    }

    monitorProcess.kill("SIGTERM"); // send signal to stop the script
    res.json({ message: "Monitoring stopped" });
};