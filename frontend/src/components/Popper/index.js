import React from 'react';
import styles from './Popper.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Popper({ children, items }) {
    const renderItems = () => {
        return items.map((item, index) => {
            return (
                <li key={index}>
                    <Link to={item.to} onClick={item.onClick}>{item.icon} {item.title}</Link>
                </li>
            );
        });
    };

    const renderResult = (attrs) => (
        <div className={cx('wrapper')} tabIndex="-1" {...attrs}>
            <ul className={cx('menu')}>{renderItems()}</ul>
        </div>
    );
    return (
        <Tippy placement="bottom-end" delay={[0, 700]} offset={[12, 27]} interactive render={renderResult}>
            {children}
        </Tippy>
    );
}

export default Popper;
