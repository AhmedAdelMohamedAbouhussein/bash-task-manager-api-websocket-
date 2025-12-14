import fs from "fs";
import path from "path";

const REPORTS_DIR = path.join(process.cwd(), "system_reports");

export const getFolderLogs = (req, res) => {
    const { folderName } = req.params;

    const validName =
        /^\d{4}-\d{2}-\d{2}-\d{2}h-\d{2}min-\d{2}sec$/;

    if (!validName.test(folderName)) {
        return res.status(400).json({
            error: "Invalid folder name"
        });
    }

    const folderPath = path.join(REPORTS_DIR, folderName);

    // 📂 Check existence
    if (!fs.existsSync(folderPath)) {
        return res.status(404).json({
            error: "Folder not found"
        });
    }

    try {
        const files = fs
            .readdirSync(folderPath)
            .filter(file =>
                fs.statSync(
                    path.join(folderPath, file)
                ).isFile()
            );

        return res.json({
            folder: folderName,
            files
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            error: "Failed to read folder"
        });
    }
};
