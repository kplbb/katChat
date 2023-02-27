import React, {useState, useEffect} from 'react'

export default function Contacts({contacts, currentUser, changeChat}) {
    const [currentUserName, setcurrentUserName] = useState(undefined);
    const [currentUserImage, setcurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(()=> {
        const getCurrentUser = async() => {
            if (currentUser) {
                setcurrentUserImage(currentUser.avatarImage);
                setcurrentUserName(currentUser.username);
            } 
        }
        getCurrentUser();
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return (
        <> 
        {currentUserName && (
            <div>
                {/* <div className="row m-auto">
                    <div className="col-4">
                        <img className="w-50" src={Logo} alt="" />
                    </div>
                    <div className="col-8"> 
                        <h1>KAT CHAT</h1>
                    </div>
                </div> */}
                <div className="contacts">
                    { 
                        contacts.map((contact, index)=> {
                            return(
                                <div className={`row m-auto my-3 ${
                                    index===currentSelected ?"bg-white border border-dark rounded-3 p-2" : ""
                                    }`} 
                                    key={index}
                                    onClick={()=>changeCurrentChat(index, contact)}>
                                    <div className="avatar col-3 d-flex justify-items-center align-items-center">
                                        <img
                                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                        alt="avatar"
                                        />
                                    </div>
                                    <div className="username col-9">
                                        <h1>{contact.username}</h1>
                                    </div>
                                </div>
                            );
                        })
                    } 
                </div>
                <div className="current-user my-2 row m-auto position-absolute bottom-0">
                    <div className="avatar col-3 d-flex justify-content-center">
                        <img
                        src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                        alt='avatar'
                        className='w-75'
                        />
                    </div>
                    <div className="username col-9 ps-5">
                        <h2>{currentUser.username}</h2>
                    </div>
                </div>
                </div>
        )}
        </>
    );
}
