import React, { useEffect, useState } from 'react';
import styles from './FormModal.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import Popper from '../Popper/Popper';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import imageSvg from '~/assets/svg';
import useDebounce from '../../hooks/useDebounce';
import axios from 'axios';
import { dispatchCreateGroup } from '../../redux/actions/chatActions';

const cx = classNames.bind(styles);

const initState = {
    name: '',
    description: '',
    search: '',
};

function FormModal({ onClose }) {
    const token = useSelector((state) => state.token);

    const [inputValue, setInputValue] = useState(initState);
    const { name, description, search } = inputValue;

    const [searchResult, setSearchResult] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const debounced = useDebounce(search, 500);

    const fetchApi = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/users?search=${debounced}`, {
                headers: { token: `Bearer ${token}` },
            });
            setSearchResult(data.users);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    };

    
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        fetchApi();
    }, [debounced]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleGroup = (result) => {
        setSelectedUsers([...selectedUsers, result]);
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    const handleFocus = () => {
        fetchApi();
        setShowResult(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedUsers || !name || !description) {
            setError(true);
        } else {
            try {
                const res = await axios.post(
                    '/chat/create',
                    {
                        name: name,
                        description: description,
                        users: JSON.stringify(selectedUsers.map((user) => user._id)),
                    },
                    {
                        headers: { token: `Bearer ${token}` },
                    },
                );

                dispatch(dispatchCreateGroup({ ...res.data }));
                onClose();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <form className={cx('wrapper')} onSubmit={handleSubmit}>
            <h3 className={cx('title')}>New channels</h3>
            <div className={cx('inputs')}>
                <input
                    type="text"
                    className={cx('input', error && !name.length && 'input-error')}
                    placeholder="Channel Name"
                    value={name}
                    name="name"
                    onChange={handleChangeInput}
                />
                <textarea
                    placeholder="Channel Description"
                    className={cx('input', error && !description.length && 'input-error')}
                    value={description}
                    name="description"
                    onChange={handleChangeInput}
                ></textarea>
                <Tippy
                    placement="bottom"
                    visible={showResult && searchResult.length > 0}
                    interactive
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <Popper>
                                <ul>
                                    {searchResult.map((result) => {
                                        return (
                                            <li onClick={() => handleGroup(result)}>
                                                <img src={result.image} alt="" />
                                                <p>{result.name}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </Popper>
                        </div>
                    )}
                    onClickOutside={handleHideResult}
                >
                    <div className={cx('add')}>
                        <div className={cx('box')}>
                            {selectedUsers.map((user) => {
                                return (
                                    <button className={cx('box-item')} onClick={() => handleDelete(user)}>
                                        <p>{user.name}</p>
                                        <img src={imageSvg.close} alt="" className={cx('icon-close')} />
                                    </button>
                                );
                            })}
                        </div>
                        <input
                            type="text"
                            placeholder="Add Members"
                            value={search}
                            className={cx('input', 'input-search', error && selectedUsers.length < 2 && 'input-error')}
                            name="search"
                            onChange={handleChangeInput}
                            onFocus={handleFocus}
                        />
                        {loading ? <FaSpinner className={cx('loading')} /> : <AiOutlineSearch className={cx('icon')} />}
                    </div>
                </Tippy>
            </div>
            <div className={cx('btn')}>
                <button>Save</button>
            </div>
        </form>
    );
}

export default FormModal;
