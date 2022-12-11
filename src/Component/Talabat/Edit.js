import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
const Edit = (props) => {
    return (
        <tr>
            <th scope="row">1</th>

            <td>{props.onsore.Name}</td>
            <td>{props.onsore.fawj?.name}</td>
            <td>معلومات العنصر</td>
            {/* <Link to="/onsore-one"><td >معلومات العنصر</td></Link> */}
            {props.isFalse ?
                <td>
                    <textarea className="form-control" placeholder='اذكر السبب' />
                    <button className="btn btn-danger m-2">تأكيد</button>
                    <button onClick={props.handleFalse} className="btn btn-secondary m-2">إلغاء</button>


                </td> :
                <td>
                    <FontAwesomeIcon onClick={() => props.handleShow(props.onsore._id)} className="m-2" style={{ fontSize: "25px", color: "green", cursor: "pointer" }} icon={faCheck} />
                    {/* <FontAwesomeIcon onClick={props.handleFalse} className="m-2" style={{fontSize:"25px", color:"brown", cursor:"pointer"}} icon={faXmark} /> */}
                    <FontAwesomeIcon onClick={() => props.handleShowTwo(props.onsore._id)} className="m-2" style={{ fontSize: "25px", color: "brown", cursor: "pointer" }} icon={faXmark} />

                </td>}

        </tr>

    )
}

export default Edit;