import React, {useEffect, useState} from 'react';
import API from "../../../utils/API";
import GenerateCard from "./GenerateCard";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function MyList() {
    const [cards, setCards] = useState([]);
    const [show, setShow] = useState(false);
    const [gameName, setGameName] = useState("");


    const closeModal = () => {
        setShow(false);
    }

    const openModal = (e) => {
        setGameName(e.target.getAttribute("data-game-name"));
        
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
                            Which Group would you like to add this game to?
                            <br />
                            <br />
                            <form>
                            <input type="radio" id="html" name="fav_language" value="HTML"></input>
                            <label htmlFor="html">HTML</label>
                            <br />
                            <input type="radio" id="css" name="fav_language" value="CSS"></input>
                            <label htmlFor="css">CSS</label>
                            <br />
                            <input type="radio" id="javascript" name="fav_language" value="JavaScript"></input>
                            <label htmlFor="javascript">JavaScript</label>
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
