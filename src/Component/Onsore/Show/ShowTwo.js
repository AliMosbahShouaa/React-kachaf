import { Component } from 'react';
import { Link } from 'react-router-dom';
import ali from '../../../aliii.jpg';

class ShowTwo extends Component {

    render() {
            let props = this.props;
        return (

            <ul>
                <li>إسم الأب : <span>{props.onsore.FatherName}</span></li>
                <li>  فئة الدم - الأب : <span>{props.onsore.FatherBloodType}</span></li>
                <li>العمل الحالي - الأب : <span>{props.onsore.FatherWork}</span></li>

                <br />

                <li>إسم الأم : <span>{props.onsore.MotherName}</span></li>
                <li>  فئة الدم - الأم : <span>{props.onsore.MotherBloodType}</span></li>
                <li>العمل الحالي - الأم : <span>{props.onsore.MotherWork}</span></li>


            </ul>

        );
    }
}

export default ShowTwo;
