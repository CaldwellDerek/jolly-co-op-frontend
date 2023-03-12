import React, {useEffect, useState} from 'react';
import API from "../../../utils/API";
import GenerateCard from "./GenerateCard";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function MyList() {
    const [cards, setCards] = useState([]);
    const [show, setShow] = useState(false);
    const [gameName, setGameName] = useState("");
    const [modalText, setModalText] = useState("");
    const [groups, setGroups] = useState([]);


    const closeModal = () => {
        setShow(false);
    }

    const openModal = async (e) => {
        setGameName(e.target.getAttribute("data-game-name"));
        const groupsByOwner = await API.getGroupsByOwner(localStorage.getItem("token"));
        console.log(groupsByOwner);
        let allGroups = groupsByOwner.map((group, index) => {
            return (
                <div key={index}>
                    <input type="radio" id={group.name} name={group.name} value={group.id}></input>
                    <label htmlFor={group.name}>{group.name}</label>
                </div>
            );
        })
        if (allGroups.length){
            setModalText("Which Group would you like to add this game to?")
            setGroups(allGroups);
        } else {
            setModalText('You cannot add a game to a group if you are not the group owner. You can create a group under the "My Group" tab.');
        }
        setShow(true);
    }

    useEffect(()=> {
            try {
                API.isValidToken(localStorage.getItem("token")).then(tokenData => {
                    API.getUserData(tokenData.user.id, localStorage.getItem("token")).then(userData => {
                        const allCards = userData.Games.map( (game, index) => {
                            return (
                                <GenerateCard key={index} id={game.id} img={game.imgURL} name={game.name} platform={game.platforms} rating={game.rating} genres={game.genres} open={openModal}/>
                            )
                        })
                        setCards(allCards);
                    })
                });
            } catch (error) { console.log(error) };
    })

    return (
        <div className='find-game-container'>
            <div className='card-container'>
                {cards}
                <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                    <Modal show={show} onHide={closeModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>
                            {gameName}
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {modalText}
                            <br />
                            <br />
                            <form>
                                {groups}
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={closeModal}>
                            Add to Group
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );

    
}

export default MyList;
