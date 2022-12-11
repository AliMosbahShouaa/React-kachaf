import { Component } from 'react';
import { Link } from 'react-router-dom';
import ali from '../../../aliii.jpg';

class ShowTree extends Component {

    render() {
        let props = this.props;
        return (
            <ul>
                <li>عدد أفراد العائلة : <span>{props.onsore.NbOfFamily}</span></li>
                <li>مكان الولادة : <span>{props.onsore.PlaceOfBirth}</span></li>
                <li>نوع المسكن : <span>{props.onsore.AddressType}</span></li>
                <br />
                <li>هل يوجد أمراض : <span>{props.onsore.Illness}</span></li>
                <li> الهواية : <span>{props.onsore.Hobbies}</span></li>
                <li>عنوان السكن : <span >{props.onsore.Address}</span></li>

            </ul>

        );
    }
}

export default ShowTree;
