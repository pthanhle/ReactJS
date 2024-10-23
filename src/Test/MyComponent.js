//class component
//function component

import React, { useState } from 'react'
import AddUserInfor from './AddUserInfor';
import DisplayInfor from './DisplayInfor';

// class MyComponent extends React.Component {
//     state = {
//         listUser: [
//             { id: 1, name: "Tai", age: "20" },
//             { id: 2, name: "Thanh", age: "21" },
//             { id: 3, name: "Tri", age: "22" },
//         ]
//     }

//     handleAddNewUser = (userObj) => {
//         this.setState({
//             listUser: [userObj, ...this.state.listUser]
//         })
//     }

//     handleDeleteUser = (userId) => {
//         let listUserNew = this.state.listUser;
//         listUserNew = listUserNew.filter(item => item.id !== userId)
//         this.setState({
//             listUser: listUserNew
//         })
//     }

//     render() {
//         return (
//             <>
//                 <div className='a'>
//                     <br />
//                     <AddUserInfor
//                         handleAddNewUser={this.handleAddNewUser}
//                     />
//                     <br />
//                     <DisplayInfor
//                         listUser={this.state.listUser}
//                         handleDeleteUser={this.handleDeleteUser}
//                     />
//                 </div >
//                 <div className='b'>

//                 </div>
//             </>
//         );
//     }
// }

const MyComponent = (props) => {

    const [listUser, setlistUser] = useState(
        [
            { id: 1, name: "Tai", age: "20" },
            { id: 2, name: "Thanh", age: "21" },
            { id: 3, name: "Tri", age: "22" },
        ]
    )

    const handleAddNewUser = (userObj) => {
        setlistUser([userObj, ...listUser])
    }

    const handleDeleteUser = (userId) => {
        let listUserNew = listUser;
        listUserNew = listUserNew.filter(item => item.id !== userId)
        setlistUser(listUserNew)
    }

    return (
        <>
            <div className='a'>
                <br />
                <AddUserInfor
                    handleAddNewUser={handleAddNewUser}
                />
                <br />
                <DisplayInfor
                    listUser={listUser}
                    handleDeleteUser={handleDeleteUser}
                />
            </div >
        </>
    );
}


export default MyComponent;