import React from 'react'
import { useSelector } from 'react-redux';
import Avatar from '../UserAvatar/avatar'

export default function UserCard() {
    const user = useSelector((state) => state.userInfo.data);
    console.log(user ,"user___");
    const {username} = user[0]

    return (
        <div className="card" style={{ borderRadius: '15px' ,border:'none'}}>
            <div className="card-body p-4">
                <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                        <Avatar />
                    </div>
                    <div className="flex-grow-1 ms-3 px-4">
                        <p className="mb-2 pb-1 helper-text" style={{ color: '#2b2a2a' }}>{username}</p>

                        <h5 className="mb-1  helper-text'">Consultation talk with me!</h5>
                        <div className="rounded-3  mb-2"
                        >
                            <div>
                                <h5 className="mb-1 mt-2 helper-text">December 14, 2022</h5>

                            </div>
                            <div >
                                <h5 className="mb-1 mt-2 helper-text">10:00 am - 11:00 am</h5>

                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
