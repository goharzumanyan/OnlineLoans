import {useSelector} from "react-redux";
import './message.scss';

const Message = () => {
    const message = useSelector((state)=>state.get('message'));

    const redirectToShop = () => {
        window.location = "https://www.ameriabank.am/";
    }

    return (
        <>
            <div className={`main_section message_page icon_${message.status}`}>
                <h1 className="section_subtitle">{message.title}</h1>
                <div className="description_block">{message.text}</div>
                <div className="buttons_block">
                    <button className="back_btn" type="button" onClick={redirectToShop}>Վերադառնալ խանութ</button>
                </div>
            </div>
        </>
    )
}

export default Message;