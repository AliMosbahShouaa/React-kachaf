import { Component } from 'react';
import { Link } from 'react-router-dom';
import ali from '../../../aliii.jpg';

class ShowFour extends Component {

    render() {
        let props = this.props;
        return (
            <ul>
                <li>التعليم الحالي : <span>{props.onsore.CurrentEducation}</span></li>
                <li>التأمين : <span>{props.onsore.Insurance}</span></li>
                <li>هل يملك لباس كشفي : <span>{props.onsore.Cloth}</span></li>
                <br />
                <li>رقم هاتف الأب : <span>{props.onsore.FatherNumber}</span></li>
                <li>رقم هاتف الأم : <span>{props.onsore.MotherNumber}</span></li>
                <li>------- : <span></span></li>

            </ul>

        );
    }
}

export default ShowFour;
