import React, { useState } from 'react';
import styles from './Edit.module.scss';
import classNames from 'classnames/bind';
import FrameInfo from '../../components/FrameInfo';
import { AiFillCamera } from 'react-icons/ai';
import noImage from '~/assets/image/no-image.png';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchUpdateUser } from '../../redux/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { createAxios } from '../../utils/createInstance';

const cx = classNames.bind(styles);

function EditPage() {
    const { user } = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token)
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, token, dispatch, dispatchUpdateUser);

    const initialState = {
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone,
        bio: user.bio,
        image: user.image,
    };
    const [userUpdate, setUserUpdate] = useState(initialState);

    const { email, password, name, phone, bio, image } = userUpdate;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        setUserUpdate({ ...userUpdate, [name]: value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);

        setUserUpdate({ ...userUpdate, image: file.preview });
    };

    const hanldeEdit = async (e) => {
        e.preventDefault();

        if (!email.length || !password.length || !name.length || !phone || !bio.length) {
            setError(true);
        } else {
            try {
                const res = await axiosJWT.put(
                    `http://localhost:5000/users/edit/` + user._id,
                    {
                        email,
                        password,
                        name,
                        phone,
                        bio,
                        image,
                    },
                    { headers: { token: `Bearer ${token}` } },
                );

                dispatch(dispatchUpdateUser({ ...res.data.user }));
                navigate('/profile');
            } catch (err) {
                console.log(err);
                // err.response.data.message && setUserUpdate({ ...user });
            }
        }
    };

    return (
        <>
            <div className={cx('back')}>
                <FaChevronLeft />
                <Link to="/profile">Back</Link>
            </div>
            <FrameInfo>
                <form onSubmit={hanldeEdit} className={cx('container')}>
                    <div className={cx('header')}>
                        <h3>Change Info</h3>
                        <p>Changes will be reflected to every services</p>
                    </div>
                    <div className={cx('avatar')}>
                        <input type="file" hidden id="selectedFile" name="image" onChange={handleImage} />
                        <label htmlFor="selectedFile">
                            <img src={image ? image : noImage} alt="" />
                            <AiFillCamera className={cx('icon')} />
                        </label>
                        <p>Change Photo</p>
                    </div>
                    <div className={cx('input', error && !name.length && 'input-error')}>
                        <p>Name</p>
                        <input
                            defaultValue={name}
                            name="name"
                            onChange={handleChangeInput}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className={cx('input', error && !bio.length && 'input-error')}>
                        <p>Bio</p>
                        <textarea
                            defaultValue={bio}
                            name="bio"
                            onChange={handleChangeInput}
                            placeholder="Enter your bio"
                        ></textarea>
                    </div>
                    <div className={cx('input', error && !phone && 'input-error')}>
                        <p>Phone</p>
                        <input
                            defaultValue={phone}
                            type="number"
                            name="phone"
                            onChange={handleChangeInput}
                            placeholder="Enter your phone"
                        />
                    </div>
                    <div className={cx('input', error && !email.length && 'input-error')}>
                        <p>Email</p>
                        <input
                            defaultValue={email}
                            name="email"
                            onChange={handleChangeInput}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className={cx('input', error && !password.length && 'input-error')}>
                        <p>Password</p>
                        <input
                            defaultValue={password}
                            type="password"
                            name="password"
                            onChange={handleChangeInput}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button>Save</button>
                </form>
            </FrameInfo>
        </>
    );
}

export default EditPage;
