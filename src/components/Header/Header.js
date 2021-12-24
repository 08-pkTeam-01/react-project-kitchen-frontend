import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import headerStyles from './Header.module.scss';
import {ROUTE_EDITOR, ROUTE_HOME, ROUTE_LOGIN, ROUTE_SETTINGS} from "../../utils/consts";
import homeIcon from '../../images/icons/home.png'
import editorIcon from '../../images/icons/editor.png'
import settingsIcon from '../../images/icons/settings.png'
import avatarIcon from '../../images/icons/avatar.png'
import classNames from "classnames";

const MenuItem = ({icon, title, link, pathname}) => {
    return (
        <li className = {classNames(headerStyles.nav_item ,{
            [headerStyles.active]: pathname === link
        })}>
            <Link to={link} className={headerStyles.link}>
                <img src={icon} alt={title}/>
                <span>{title}</span>
            </Link>
        </li>
    )
}
export const Header = ({appName, currentUser}) => {
    const {pathname} = useLocation()
    console.log(pathname)
    return (
        <header className={headerStyles.wrapper}>
            <nav className={headerStyles.content}>
                <Link to={ROUTE_HOME} className={headerStyles.link}>
                    <h1>{appName.toLowerCase()}</h1>
                </Link>
                <ul className={headerStyles.navigation}>
                    <MenuItem icon={homeIcon} title='Главная' link={ROUTE_HOME} pathname={pathname}/>
                    {!currentUser && (
                        <li>
                            <Link to={ROUTE_LOGIN} className={headerStyles.link}>
                                Войти
                            </Link>
                        </li>
                    )}
                    {currentUser && (
                        <>
                            <MenuItem icon={editorIcon} title='Новая запись' link={ROUTE_EDITOR} pathname={pathname}/>
                            <MenuItem icon={settingsIcon} title='Настройки' link={ROUTE_SETTINGS} pathname={pathname}/>
                            <MenuItem icon={avatarIcon} title={currentUser.username}
                                      link={`/@${currentUser.username}`} pathname={pathname}/>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;

