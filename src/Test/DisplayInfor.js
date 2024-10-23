import React, { useEffect, useState } from "react";
import './DisplayInfor.scss';


const DisplayInfor = (props) => {

    const { listUser } = props;

    const [isShowHideListUser, setShowHideListUser] = useState(true);

    const handleShowHideListUser = () => {
        setShowHideListUser(!isShowHideListUser);
    }

    useEffect(
        () => {
            if (listUser.length === 0) {
                alert('USER = 0')
            }
            console.log('call useEffect: ')
        }, [listUser]
    );

    return (
        < >
            <div>
                <span onClick={() => { handleShowHideListUser() }}>
                    {isShowHideListUser ? 'Hide' : 'Show'}
                </span>
            </div>
            {isShowHideListUser &&
                <div className="display-infor-container">
                    {listUser.map((user, index) => {
                        return (
                            <>
                                <div key={user.id} className={+user.age == 20 ? "red" : "green"}>
                                    <div>STT: {index + 1}</div>
                                    <div>My name is: {user.name}</div>
                                    <div>My age is: {user.age}</div>
                                    <div>
                                        <button onClick={() => { props.handleDeleteUser(user.id) }}>Delete</button>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            }
        </>
    );
}

export default DisplayInfor