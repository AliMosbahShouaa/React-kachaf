import { Component } from 'react';
import { Link } from 'react-router-dom';
import ali from '../../../aliii.jpg';
import axios from 'axios'
class ShowOne extends Component {
    state = {
        isEdit: false,
        serial: '',
        error: ''
    }

    Edit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    onSerial = () => {
        if (this.state.serial === '') {
            this.setState({
                error: "الحقل فارغ"
            })
            return
        }
        let id = localStorage.getItem("idUser");

        let data = {
            SerialNumber: this.state.serial
        }

        axios.post(`http://localhost:8080/api/add_Serial/${id}`, data)
            .then(res => {
                if (res.data.message === 'success') {
                    window.location.reload();
                }
                else {
                    this.setState({
                        error: "هناك خطأ ",
                        isLoading: !this.state.isLoading
                    });
                }
            })

    }
    ChangeSerial = (e) => {
        this.setState({
            serial: e.target.value
        })
    }
    render() {
        let props = this.props;
        return (

            <ul>
                <div className="error ">{this.state.error}</div>
                {props.onsore.SerialNumber ?
                    <li>الرقم التسلسلي : {this.state.isEdit ?
                        <span style={{ background: "transparent" }}>
                            <input style={{ border: "1px solid black" }} className="serial" type="text" onChange={this.ChangeSerial} /><button onClick={this.onSerial} style={{ fontSize: "12px" }} className="btn mx-2 btn-success">تعديل</button>
                        </span>
                        :
                        <span onDoubleClick={this.Edit}>{props.onsore.SerialNumber}</span>}
                    </li>
                    :
                    <li>الرقم التسلسلي :
                        <span >--</span>
                    </li>}

                <li>الصفة : {props.onsore.Position === "onsor" ?
                    <span>عنصر</span> :
                    props.onsore.Position === "leader" ?
                        <span>قائد</span> :
                        props.onsore.Position === "amid" ?
                            <span>عميد</span> :
                            props.onsore.Position === "moufawad" ?
                                <span>مفوض</span> :
                                props.onsore.Position === "helping leader" ?
                                    <span>مساعد قائد</span> : <span>غير محدد</span>}</li>
                <li>البريد  الإلكتروني : <span>{props.onsore.Email}</span></li>
                <br />
                <li>تاريخ الولادة : <span>{props.onsore.Date}</span></li>
                <li>رقم الهاتف : <span>{props.onsore.Number}</span></li>
                <li>فئة الدم : <span>{props.onsore.BloodType}</span></li>

            </ul>

        );
    }
}

export default ShowOne;
