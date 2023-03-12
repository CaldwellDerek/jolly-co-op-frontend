import React, {useEffect, useState} from 'react';
import API from "../../../utils/API";
import GenerateCard from "./GenerateCard";
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
        let allGroups = groupsByOwner.map((group, index) => {
            return (
                <div key={index}>
                    <input type="radio" data-game-id={e.target.getAttribute("data-game-id")} id={group.name} name={group.name} value={group.id}></input>
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (document.querySelector('input:checked')) {
            const groupId= document.querySelector('input:checked').value;
            const gameId = document.querySelector('input:checked').getAttribute("data-game-id");
            const addGame = await API.addGametoGroup(gameId, groupId, localStorage.getItem("token"));
        }
        closeModal();
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
                            <form onSubmit={handleSubmit}>
                                {groups}
                                <br />
                                <br />
                                <button type="button" className='btn btn-primary me-3' onClick={closeModal}>Close</button>
                                <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );

    
}

export default MyList;
