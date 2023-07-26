import React, { useEffect, useRef, useState } from 'react';
import styles from './Channel.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchMember } from '../../../redux/actions/chatActions';

const cx = classNames.bind(styles);

function Channel({ chat }) {
    const [member, setMember] = useState([]);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const memberData = await Promise.all(
                chat.users.map(async (user) => {
                    const res = await fetchMember(user, token, axios);
                    return res.data.user;
                }),
            );

            setMember(memberData);
        };

        fetchData();
    }, [chat.users]);

    return (
        <div className={cx('container')}>
            <h3>{chat.name}</h3>
            <p>{chat.description}</p>
            <h3>Members</h3>
            <div className={cx('member')}>
                {member.map((user) => {
                    return (
                        <div className={cx('member-item')}>
                            <img src={user.image} alt="" />
                            <h4>{user.name}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Channel;
