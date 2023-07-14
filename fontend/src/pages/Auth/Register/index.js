import React, { useState } from 'react';
import styles from '../Auth.module.scss';
import className from 'classnames/bind';
import imageSvg from '~/assets/svg';
import { FaFacebookSquare } from 'react-icons/fa';
import { BsGithub, BsTwitter, BsGoogle } from 'react-icons/bs';
import { MdMail } from 'react-icons/md';
import { BiSolidLock } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const cx = className.bind(styles);

const initialState = {
    email: '',
    password: '',
};

function RegisterPage() {
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();

    const { email, password, err, success } = user;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:5000/users/register',
                {
                    email,
                    password,
                },
                { withCredentials: true },
            );

            setUser({ ...user, err: '', success: res.data.message });

            // dispatch(dispatchLogin());
        } catch (err) {
            console.log(err);
            err.response.data.message && setUser({ ...user, err: err.response.data.message, success: '' });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <img src={imageSvg.logo} alt="" />
                <div className={cx('title')}>
                    <h3>Join thousands of learners from around the world</h3>
                    <p className={cx('description')}>
                        Master web development by making real-life projects. There are multiple paths for you to choose
                    </p>
                </div>
                <div className={cx('input')}>
                    <MdMail className={cx('input-icon')} />
                    <input type="email" value={email} name="email" onChange={handleChangeInput} placeholder="Email" />
                </div>
                <div className={cx('input')}>
                    <BiSolidLock className={cx('input-icon')} />
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={handleChangeInput}
                        placeholder="Password"
                    />
                </div>
                <button className={cx('btn')}>Start coding now</button>
                <div className={cx('social')}>
                    <span>or continue with these social profile</span>
                    <div className={cx('icons')}>
                        <span>
                            <BsGoogle />
                        </span>
                        <span>
                            <FaFacebookSquare />
                        </span>
                        <span>
                            <BsTwitter />
                        </span>
                        <span>
                            <BsGithub />
                        </span>
                    </div>
                </div>
                <p className={cx('account')}>
                    Adready a member? <Link to="/">Login</Link>
                </p>
            </form>
            <div className={cx('create-by')}>
                <p>
                    created by <span>username</span>
                </p>
                <p>devChallenges.io</p>
            </div>
        </div>
    );
}

export default RegisterPage;
