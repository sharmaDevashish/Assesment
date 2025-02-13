import './popupMsg.css';

const PopupMessage = ({ message }) => {
    return (<div className="popupContainer">
        {message}
    </div>)
}

export default PopupMessage;