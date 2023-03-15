import React, {useEffect, useState} from 'react';
import API from "../../../utils/API";
import GenerateCard from "./GenerateCard";
import Modal from 'react-bootstrap/Modal';
import "./style.css"

const styleButton = {
    backgroundColor: "#ec5e5e",
    borderColor: "#ec5e5e"
}

function MyList() {
    const [cards, setCards] = useState([]);
    const [show, setShow] = useState(false);
    const [gameName, setGameName] = useState("");
    const [modalText, setModalText] = useState("");
    const [groups, setGroups] = useState([]);
    const [style, setStyle] = useState({});


    const closeModal = () => {
        setShow(false);
        setStyle({});
    }

    const openModal = async (e) => {
        setGameName(e.target.getAttribute("data-game-name"));
        const groupsByOwner = await API.getGroupsByOwner(localStorage.getItem("token"));
        let allGroups = groupsByOwner.map((group, index) => {
            return (
                <div key={index}>
                    <input type="radio" data-game-id={e.target.getAttribute("data-game-id")} id={group.name} name="radio" value={group.id}></input>
                    <label htmlFor={group.name}>{group.name}</label>
                </div>
            );
        })

        setShow(true);

        if (allGroups.length){
            setModalText("Which Group would you like to add this game to?")
            setGroups(allGroups);
        } else {
            setModalText('You do not own any Groups to add this game to, you can create a group under the "My Group" tab.');
            setStyle({
                visibility: 'hidden'
            });
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (document.querySelector('input:checked')) {
            const groupId = document.querySelector('input:checked').value;
            const groupName = document.querySelector('input:checked').getAttribute("id");
            const gameId = document.querySelector('input:checked').getAttribute("data-game-id");

            const addGame = await API.addGametoGroup(gameId, groupId, localStorage.getItem("token"));
            document.querySelector(".submit-button").innerHTML = "Submitted!";
            document.querySelector(".submit-results").style.color = "green";
            document.querySelector(".submit-results").innerHTML =`Successfully added ${gameName} to ${groupName}!`

            setTimeout(closeModal, 2000);
        } else {
            document.querySelector(".submit-results").style.color = "red";
            document.querySelector(".submit-results").innerHTML =`Please select a Group to add your Game to!`
        }
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
    },[])

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
                                <button type="button" className='btn btn-primary me-3' style={styleButton} onClick={closeModal}>Close</button>
                                <button type="submit" className='btn btn-primary submit-button' id="submit-style" style={style} onClick={handleSubmit}>Submit</button>
                                <div>
                                    <p className="submit-results" style={{textAlign: 'center', marginTop: "20px"}}></p>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );

    
}

export default MyList;
