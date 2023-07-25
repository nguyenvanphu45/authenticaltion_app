import React, { useEffect } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineSearch } from 'react-icons/ai';
import { dispatchGetChat, fetchChat } from '../../../redux/actions/chatActions';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../utils/createInstance';
import { dispatchLogoutUser } from '../../../redux/actions/authActions';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search() {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.token);
    const chats = useSelector((state) => state.chat.chat);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, token, dispatch, dispatchLogoutUser);

    useEffect(() => {
        const getChat = () => {
            return fetchChat(token, axiosJWT).then((res) => {
                dispatch(dispatchGetChat([...res.data]));
            });
        };

        getChat();
    }, []);
    return (
        <div className={cx('search')}>
            <div className={cx('search-input')}>
                <AiOutlineSearch />
                <input type="text" placeholder="Search" />
            </div>
            <div className={cx('search-list')}>
                {chats.map((chat) => {
                    return (
                        <Link to={`/chat/${chat._id}`} className={cx('list-item')} state={{ chat }} key={chat._id}>
                            <img src={chat.image} alt="" />
                            <p>{chat.name}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Search;
