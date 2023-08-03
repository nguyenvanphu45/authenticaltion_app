import React, { useEffect, useState } from 'react';
import styles from './Message.module.scss';
import classNames from 'classnames/bind';
import imageSvg from '../../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import io from 'socket.io-client';
import Lottie from 'lottie-react';
import animationData from '~/assets/animation/typing.json';
import ScrollableMessage from '../ScrollableMessage';
import { dispatchNotification } from '../../redux/actions/groupActions';

const cx = classNames.bind(styles);

const socket = io.connect('http://10.10.23.32:5000');
let groupSelectedCompare;

function Message({ groupSelected }) {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.token);
    const notification = useSelector((state) => state.group.notification);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const dispatch = useDispatch();

    const configHeader = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const fetchMessages = async () => {
        try {
            let { data } = await axios.get(`/chat/${groupSelected._id}`, configHeader);

            setMessages(data);
            socket.emit('join chat', groupSelected._id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMessages();
        groupSelectedCompare = groupSelected;
    }, [groupSelected]);

    const sendMessage = async (e) => {
        if (e.key === 'Enter' && newMessage) {
            socket.emit('stop typing', groupSelected._id);
            try {
                let { data } = await axios.post(
                    '/chat',
                    {
                        content: newMessage,
                        groupId: groupSelected._id,
                    },
                    configHeader,
                );

                socket.emit('new message', data);
                setNewMessage('');
                setMessages([...messages, data]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        socket.emit('setup', user);
        socket.on('connection', () => console.log('Connection!!'));
        socket.on('typing', () => setIsTyping(true));
        socket.on('stop typing', () => setIsTyping(false));
    }, []);

    useEffect(() => {
        socket.on('message received', (newMessageReceived) => {
            if (!groupSelectedCompare || groupSelectedCompare._id !== newMessageReceived.group._id) {
                // notification
                if (!notification || !notification.includes(newMessageReceived)) {
                    dispatch(dispatchNotification(newMessageReceived));
                }
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    });

    const typingHandler = async (e) => {
        setNewMessage(e.target.value);

        if (!typing) {
            setTyping(true);
            socket.emit('typing', groupSelected._id);
        }

        let lastTypingTime = new Date().getTime();
        let timerLength = 3000;

        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit('stop typing', groupSelected._id);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <>
            <div className={cx('messages')}>
                <ScrollableMessage messages={messages} user={user} />
            </div>
            {isTyping ? (
                <div className={cx('typing')}>
                    <Lottie animationData={animationData} className={cx('typing-icon')} loop={true} />
                </div>
            ) : (
                <></>
            )}
            <div className={cx('input')}>
                <input
                    type="text"
                    placeholder="Type message here"
                    value={newMessage}
                    onKeyDown={sendMessage}
                    onChange={typingHandler}
                />
                <button>
                    <img src={imageSvg.plane} alt="" />
                </button>
            </div>
        </>
    );
}

export default Message;
