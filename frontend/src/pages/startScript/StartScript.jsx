import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./StartScript.module.css";
import Navbar from "../../components/navbar/Navbar.jsx";



function StartScript() 
{
    const backendUrl = "http://localhost:8000";
    const navigate = useNavigate();

    async function handleStartScript() 
    {
        try
        {
            const res = await axios.post(`${backendUrl}/bash/start`);
            console.log("Script started successfully:", res.data);
            navigate("/monitor");
        }
        catch (error)
        {
            console.error("Error starting script:", error);
        }
    }


    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.title}>Start Script Page</h1>
            </div>
            <div className={styles.body}>
                <button onClick={handleStartScript}>Start Script</button>
            </div>
        </div>
    );
}

export default StartScript;