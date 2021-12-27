import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import headerStyles from './Header.module.scss';
import {ROUTE_EDITOR, ROUTE_HOME, ROUTE_LOGIN, ROUTE_SETTINGS} from "../../utils/consts";
import homeIcon from '../../images/icons/home.png'
import editorIcon from '../../images/icons/editor.png'
import settingsIcon from '../../images/icons/settings.png'
import avatarIcon from '../../images/icons/avatar.png'
import entranceIcon from '../../images/icons/entrance.png'

const NavItem = ({icon, title, link}) => {
    const classNames = ({isActive}) => headerStyles.link + ' ' + (isActive && headerStyles.active)
    return (
        <li className={headerStyles.nav_item}>
            <NavLink to={link} className={classNames}>
                <img src={icon} alt={title}/>
                <span>{title}</span>
            </NavLink>
        </li>
    )
}
export const Header = ({appName, currentUser}) => {
    return (
        <header className={headerStyles.wrapper}>
            <nav className={headerStyles.content}>
                <Link to={ROUTE_HOME} className={headerStyles.link}>
                    <h1>{appName.toLowerCase()}</h1>
                </Link>
                <ul className={headerStyles.navigation}>
                    <NavItem icon={homeIcon} title='Главная' link={ROUTE_HOME}/>
                    {!currentUser && (
                        <NavItem icon={entranceIcon} title='Войти' link={ROUTE_LOGIN}/>
                    )}
                    {currentUser && (
                        <>
                            <NavItem icon={editorIcon} title='Новая запись' link={ROUTE_EDITOR}/>
                            <NavItem icon={settingsIcon} title='Настройки' link={ROUTE_SETTINGS}/>
                            <NavItem icon={avatarIcon} title={currentUser.username}
                                      link={`/@${currentUser.username}`}/>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;

