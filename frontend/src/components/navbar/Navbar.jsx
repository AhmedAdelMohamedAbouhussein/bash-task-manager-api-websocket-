import { useState } from 'react';
import {Link} from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar()
{
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleNavbar = () =>
    {
        setIsOpen(!isOpen);
    };

    const handlesidebarclick = () =>
    {
        if (!isOpen)
        {
            setIsOpen(true);
        }        
    };

    return (
        <div className={`${styles.navbar} ${!isOpen ? styles.hide : ''}`} onClick={handlesidebarclick}>
            <div className={styles.arrow} onClick={toggleNavbar}>
                {isOpen ? '<' : '>'}
            </div>
            <div className={styles.content}>
                <div className={styles.items}>
                    <h3>Menu</h3>
                    <ul className={styles.ulist}>
                        <li className={styles.listitems}>
                            <Link className={styles.links} to= "/cpu">CPU</Link>
                        </li>
                        <li className={styles.listitems}>
                            <Link className={styles.links} to= "/ram">RAM</Link>
                        </li>
                        <li className={styles.listitems}>
                            <Link className={styles.links} to= "/disk">Disk</Link>
                        </li>
                        <li className={styles.listitems}>
                            <Link className={styles.links} to= "/gpu">GPU</Link>
                        </li>
                        <li className={styles.listitems}>
                            <Link className={styles.links} to= "/network">Network</Link>
                        </li>
                        <li className={styles.listitems}>
                            <Link className={styles.links} to= "/smartstatus">smartStatus</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );  
}   
export default Navbar;