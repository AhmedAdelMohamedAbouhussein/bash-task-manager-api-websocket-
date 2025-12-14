import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./Reports.module.css";

function Reports() {
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch folders on mount
    useEffect(() => {
        axios
            .post("http://localhost:8000/reports/folders")
            .then((res) => {
                setFolders(res.data);
            })
            .catch(() => {
                setError("Failed to load folders");
            });
    }, []);

    // Open a folder
    const openFolder = async (folderName) => 
    {
        setSelectedFolder(folderName);
        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(
                `http://localhost:8000/reports/folders/${folderName}`
            );

            setFiles(res.data.files ?? res.data);
        } catch {
            setError("Failed to load folder content");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <h3>Reports</h3>

                {folders.length === 0 && !error && (
                    <p>No reports found</p>
                )}

                {folders.map((f) => {
                    const folderName = f.raw ?? f;

                    return (
                        <div
                            key={folderName}
                            className={`${styles.folder} ${
                                selectedFolder === folderName
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={() => openFolder(folderName)}
                        >
                            {f.date ? (
                                <>
                                    <strong>{f.date}</strong>
                                    <div className={styles.time}>
                                        {f.time}
                                    </div>
                                </>
                            ) : (
                                folderName
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Right panel: files */}
            <div className={styles.content}>
                {!selectedFolder && (
                    <p>Select a report folder</p>
                )}

                {loading && <p>Loading...</p>}

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}

                {selectedFolder && !loading && !error && (
                    <>
                        <h3>{selectedFolder}</h3>

                        {files.length === 0 ? (
                            <p>No files in this folder</p>
                        ) : (
                            <ul>
                                {files.map((file) => (
                                    <li key={file}>{file}</li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Reports;
