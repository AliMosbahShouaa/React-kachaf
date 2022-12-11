import { Component } from 'react';
import { Link } from 'react-router-dom';
import ali from '../../aliii.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import Edit from './Edit';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
class Talabat extends Component {
    state = {
        isFalse: false,
        onsors: [],
        isLoading: false,
        check: "",
        show: false,
        showTwo: false,
        idCheck: ""

    }
    handleFalse = () => {
        this.setState({
            isFalse: !this.state.isFalse
        })
    }

    handleClose = () => {
        this.setState({
            show: false,
            check: null,
            showTwo: false,
            idCheck: ""
        })
    };
    handleShow = (id) => {
        this.setState({
            show: true,
            check: "True",
            idCheck: id
        })
    };
    handleShowTwo = (id) => {
        this.setState({
            showTwo: true,
            check: "False",
            idCheck: id
        })
    };
    getInfo = async () => {

        fetch(`http://localhost:8080/api/get-user`, {
            method: 'GEt'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    onsors: data.user,
                    isLoading: true

                });
            })
    }
    componentDidMount() {
        this.getInfo();
    }
    onCheck = () => {

        let data = {
            Check: this.state.check
        }
        let id = this.state.idCheck
        axios.post(`http://localhost:8080/api/add_Check/${id}`, data)
            .then(res => {
                this.getInfo();
                this.handleClose();
                this.setState({
                    check: null,
                    idCheck: ""
                })
            })

            .catch(err => {
                this.setState({
                    error: err.response.data.message
                })
            })
    }
    render() {
        return (
            <div className="talabat">
                <header className="text-center">
                    <h2>إدارة الطلبات</h2>
                </header>
                <Modal className="modal-input" show={this.state.show} onHide={this.handleClose}>

                    <Modal.Body>
                        <h4>هل تريد التأكيد ؟</h4>
                        <div className="py-3">
                            <button onClick={this.onCheck} class="btn btn-success mx-2  " type="submit">تأكيد</button>
                            <button onClick={this.handleClose} class="btn btn-primary mx-2" type="submit">إلغاء</button>
                        </div>

                    </Modal.Body>

                </Modal>
                <Modal className="modal-input" show={this.state.showTwo} onHide={this.handleClose}>

                    <Modal.Body>
                        <h4>هل تريد الرفض ؟</h4>
                        <div className="py-3">
                            <button onClick={this.onCheck} class="btn btn-danger mx-2  " type="submit">رفض</button>
                            <button onClick={this.handleClose} class="btn btn-primary mx-2" type="submit">إلغاء</button>
                        </div>

                    </Modal.Body>

                </Modal>
                <div >
                    <div >

                        <table class="table table-striped table-talabat">
                            <thead>
                                <tr>
                                    <th scope="col">الطلبات الواردة</th>
                                    <th scope="col">الإسم</th>
                                    <th scope="col">الفوج</th>
                                    <th scope="col">معلومات</th>
                                    <th scope="col">حالة الطلب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!this.state.isLoading ?
                                    <div className="text-center py-5">
                                        <h3 >الرجاء الإنتظار..</h3>
                                        <div class="spinner-border " role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div> :
                                    this.state.onsors.filter((ons, index) => {
                                        return !ons.Check
                                    }).map((onsore, index) => {
                                        return (
                                            <Edit handleShow={this.handleShow} handleShowTwo={this.handleShowTwo} onsore={onsore} isFalse={this.state.isFalse} handleFalse={this.handleFalse} />
                                        )
                                    })}
                            </tbody>


                        </table>
                        <table class="table table-striped table-talabat">
                            <thead>
                                <tr>
                                    <th scope="col">الطلبات المرفوضة</th>
                                    <th scope="col">الإسم</th>
                                    <th scope="col">معلومات</th>
                                    <th scope="col">سبب الرفض</th>
                                    <th scope="col">تغيير حالة الطلب</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !this.state.isLoading ?
                                        <div className='text-center py-5'>
                                            <h3 >الرجاء الإنتظار..</h3>
                                            <div class="spinner-border " role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div> :
                                        this.state.onsors.filter((ons, index) => {
                                            return ons.Check === "False"
                                        }).map((onsore, index) => {
                                            return (
                                                <tr>
                                                    <th scope="row">1</th>

                                                    <td>{onsore.Name}</td>
                                                    <td>معلومات العنصر</td>
                                                    {/* <Link to="/onsore-one"><td >معلومات العنصر</td></Link> */}
                                                    <td>السبب ؟</td>
                                                    <td >
                                                        <FontAwesomeIcon  onClick={() => this.handleShow(onsore._id)} className="m-2" style={{ fontSize: "25px", color: "green", cursor: "pointer" }} icon={faCheck} />
                                                    </td>

                                                </tr>
                                            )
                                        })}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        );
    }
}

export default Talabat;
