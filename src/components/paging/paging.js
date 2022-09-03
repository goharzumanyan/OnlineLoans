import './paging.scss';
import {Link} from "react-router-dom";

const Paging = ({back,forward,page,count}) => {

    return (
        <div className="paging">
            <div className="paging_inner">
          <button className="icon_left" onClick={back} type="button" disabled={!back}></button>
          <span className="pages_info">Քայլ {page} ({count}-ից)</span>
                <button className="icon_right" onClick={forward} type="button" disabled={!forward}></button>
            </div>
        </div>
    )
}

export default Paging;