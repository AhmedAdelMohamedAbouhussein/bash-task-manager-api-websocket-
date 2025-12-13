import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMicrochip, FaHdd, FaNetworkWired, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { MdMemory } from "react-icons/md";

import styles from './Navbar.module.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleSidebarClick = () => {
        if (!isOpen) setIsOpen(true);
    };

    return (
        <div
            className={`${styles.navbar} ${!isOpen ? styles.hide : ''}`}
            onClick={handleSidebarClick}
        >
            <div className={styles.content}>
                <div className={styles.top}>
                    <h3>Menu</h3>
                    <div className={styles.arrow} onClick={toggleNavbar}>
                        {isOpen ? <FaCaretLeft /> : <FaCaretRight />}
                    </div>
                </div>

                <div className={styles.items}>
                    <ul className={styles.ulist}>
                        <li className={styles.listitems}>
                            <FaMicrochip className={styles.icons} />
                            <Link className={styles.links} to="/cpu">CPU</Link>
                        </li>
                        <li className={styles.listitems}>
                            <MdMemory className={styles.icons} />
                            <Link className={styles.links} to="/ram">RAM</Link>
                        </li>
                        <li className={styles.listitems}>
                            <FaHdd className={styles.icons} />
                            <Link className={styles.links} to="/disk">Disk</Link>
                        </li>
                        <li className={styles.listitems}>
                            <FaMicrochip className={styles.icons} />
                            <Link className={styles.links} to="/gpu">GPU</Link>
                        </li>
                        <li className={styles.listitems}>
                            <FaNetworkWired className={styles.icons} />
                            <Link className={styles.links} to="/network">Network</Link>
                        </li>
                        <li className={styles.listitems}>
                            <FaNetworkWired className={styles.icons} />
                            <Link className={styles.links} to="/smartstatus">Smart Status</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
