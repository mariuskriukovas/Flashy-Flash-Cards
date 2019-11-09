import decks from "./flashcards";

const createNewCard = (front, back, time)=>
{
    const myCard = {front: "", back: "", time:0, setTime:null}
    myCard.front = front
    myCard.back = back
    myCard.time = time
    myCard.setTime = (time)=>
    {
        myCard.time = time
    }
    return myCard
}

const createCard = (oldCard)=>
{
    return createNewCard(oldCard.front, oldCard.back,0)
}

const createDeck = (name,cards)=>
{
    const myDeck  = {name: "", cards:[], addCard:null}
    myDeck.name = name
    myDeck.cards = cards
    myDeck.addCard = (front,back, time)=>
    {
        myDeck.cards.push(createNewCard(front,back,time))
    }
    return myDeck
}

const comapareMyCards = (cardI, cardII)=>
{
    return cardI.time - cardII.time
}

const sortMyDeck = (cards) =>
{
    return cards.sort(comapareMyCards)
}

const createNewDeck =  (name)=>
{
    let newDeck = createDeck(name,[])
    //newDeck.addCard("Empty deck","Empty deck",0)
    return newDeck
}


const Cards = decks

const createMyDecks = ()=>
{
    const myCardDecks = []
    decks.forEach((x)=> {myCardDecks.push(createDeck(x.name, x.cards.map((x)=>createCard(x))))})
    return myCardDecks
}

const CardManager = ()=>
{
    const myFunctions  = {createMyDecks: null, createNewDeck:null, sortMyDeck:null, createNewCard:null}
    myFunctions.createMyDecks = createMyDecks
    myFunctions.createNewDeck = createNewDeck
    myFunctions.sortMyDeck = sortMyDeck
    myFunctions.createNewCard = createNewCard
    return myFunctions
}

export default CardManager


