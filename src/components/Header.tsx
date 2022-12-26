import styles from './Header.module.css';

import toDoListLogo from '../assets/todolist-logo.svg';

export function Header() {
    return (
        <header className={styles.header}>
            <img className={styles.logoImg}
                src={toDoListLogo}
                alt="Logotipo do ToDo List"
            />
        </header>
    );
}