import React from 'react';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Menu({ children, items, sidebar }) {
    const renderItems = () => {
        return items.map((item, index) => {
            return (
                <li key={index}>
                    <Link to={item.to} onClick={item.onClick}>
                        {item.icon} {item.title}
                    </Link>
                </li>
            );
        });
    };

    const renderResult = (attrs) => (
        <div className={cx('wrapper', sidebar &&'wrapper-dark')} tabIndex="-1" {...attrs}>
            <ul className={cx('menu')}>{renderItems()}</ul>
        </div>
    );
    return (
        <Tippy placement="top-end" delay={[0, 500]} offset={[7, 7]} interactive render={renderResult}>
            {children}
        </Tippy>
    );
}

export default Menu;
