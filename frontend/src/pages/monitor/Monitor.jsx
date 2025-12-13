import { useEffect, useRef, useState } from "react";
import styles from "./Monitor.module.css";
import Navbar from "../../components/navbar/Navbar";

function Monitor() {
    const [logs, setLogs] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        // Open WebSocket connection
        const socket = new WebSocket("ws://localhost:8000");
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("Connected to WebSocket");
            // Do NOT send START automatically
        };

        socket.onmessage = (event) => {
            setLogs(prev => [...prev, event.data]);
        };

        socket.onerror = (err) => {
            console.error("WebSocket error", err);
        };

        return () => {
            // Send STOP if the socket is still open
            if (socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.send("STOP");
            }
            socket.close();
        };
    }, []);

    // Functions to start/stop monitoring
    const handleStart = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send("START");
        }
    };

    const handleStop = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send("STOP");
        }
    };

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.top}>
                    <h2 className={styles.title}>Live Monitor</h2>
                </div>
                <div className={styles.body}>
                    <div className={styles.buttons}>
                        <button onClick={handleStart}>Start</button>
                        <button onClick={handleStop}>Stop</button>
                    </div>

                </div>
                <div className={styles.body}>
                    <pre className={styles.output}>
                        {logs.join("\n")}
                    </pre>
                </div>
            </div>

            


        </div>
    );
}

export default Monitor;
