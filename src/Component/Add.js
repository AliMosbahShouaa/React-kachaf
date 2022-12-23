import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../kachaf.jpg';
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';

const Add = () => {
    const [open, setOpen] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);
    const [openThree, setOpenThree] = useState(false);
    const [moufawadiyeh, setmoufawadiyeh] = useState([]);
    const [fawj, setFawj] = useState([]);
    const [squad, setsquad] = useState([]);
    const [Error, setError] = useState('');
    const [ErrorTwo, setErrorTwo] = useState('');

    const [Status, setStatus] = useState('');
    const [StatusTwo, setStatusTwo] = useState('');

    const [Server, setServer] = useState('');

    const [idDelete, setIdDelete] = useState('');
    const [show, setShow] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [value, setValue] = useState('');
    const [mfdSelect, setmfdSelect] = useState('');

    const [Fwj, setFwj] = useState('');
    const [Moufawadiyeh, setMoufawadiyeh] = useState('');
    const [selectmfd, setSelectMfd] = useState('');

    const handleMoufawad = (e) => {
        setMoufawadiyeh(e.target.value)
        setError('')
        setStatus('')
    };
    const handelFwj = (e) => setFwj(e.target.value);
    const handleSelectMfd = (e) => setSelectMfd(e.target.value);
    const handleShow = (id, value) => {
        setShow(true);
        setIdDelete(id);
        if (value === "mfd") {
            setValue("moufawadiyeh")
        }
        if (value === "fwj") {
            setValue("fawj")
        }
        if (value === "sqd") {
            setValue("squad")
        }
    }

    const handleClose = (e) => {
        setShow(false);
        setIdDelete('')
    }

    async function fetchMyMoufawad() {
        await fetch('http://localhost:8080/api/get-moufawadiyeh')
            .then(res => res.json())
            .then(data => {
                if (data.message === ("success")) {
                    setmoufawadiyeh(data.moufawads)
                }

            })

            .catch((e) => {
                setServer("هناك خطأ في النظام")
            })
    }
    async function fetchMyFawj() {

        await fetch('http://localhost:8080/api/get-fawj')
            .then(res => res.json())
            .then(data => {
                if (data.message === ("success")) {
                    setFawj(data.fawj)
                }

            })

            .catch((e) => {
                setServer("هناك خطأ في النظام..")
            })
    }


    useEffect(() => {
        fetchMyMoufawad()
        fetchMyFawj()
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        let data = {
            name: Moufawadiyeh
        }
        axios.post('http://localhost:8080/api/add-moufawadiyeh', data)

            .then(res => {

                if (res.data.message === 'success') {
                    setStatus("تمت العملية بنجاح")
                    fetchMyMoufawad();
                }
                else {
                    setError("لم تتم العملية!")
                }
            })

            .catch(err => {
                setError("لم تتم العملية!")
            })

    }
    const onSubmitFwj = (e) => {
        e.preventDefault();

        let data = {
            name: Fwj,
            moufawadiyeh: selectmfd
        }
        axios.post('http://localhost:8080/api/add-fawj', data)

        .then(res => {

            if (res.data.message === 'success') {
                setStatusTwo("تمت العملية بنجاح")
                fetchMyFawj();
            }
            else {
                setErrorTwo("لم تتم العملية!")
            }
        })

        .catch(err => {
            setErrorTwo("لم تتم العملية!")
        })

    }

    const onDelete = (e) => {
        // setIsDelete(true)
        // let id = idDelete;
        // let url = "url"

        // if (value === "moufawadiyeh") {
        //     url = `http://localhost:8080/api/delete-mfd/${id}`
        // }
        // if (value === "fawj") {
        //     url = `http://localhost:8080/api/delete-fwj/${id}`
        // }
        // if (value === "squad") {
        //     url = `http://localhost:8080/api/delete-sqd/${id}`
        // }
        // axios.post(url)
        //     .then(res => {
        //         // fetchMySquad();
        //         fetchMyFawj();
        //         fetchMyMoufawad();
        //         handleClose();
        //         setIsDelete(false);
        //     })

        //     .catch(err => {
        //         setError(err.response.data.message)
        //         setIsDelete(false)
        //     })
    }
    const accordionOne = (e) => {
        setOpen(!open)
        setOpenTwo(false)
        fetchMyMoufawad();

    }
    const accordionTwo = (e) => {
        setOpenTwo(!openTwo)
        setOpen(false)
        fetchMyFawj();

    }

    return (
        <div className="info-add">
            <div className="Header">
                <div className='row p-0 m-0 text-center' >

                    <div>
                        <h1>إدارة المفوضية</h1>
                    </div>
                </div>
            </div>
            <Button className="add-button" onClick={() => accordionOne()}>
                المفوضيات في كشافة الإيمان
            </Button>
            <Collapse id="collapse" in={open}>
                <div className="row p-0 m-0">
                    <div className="col-md-8 p-2">
                        <span className='error '>{Server}</span>

                        {!moufawadiyeh.length ?
                            <span className='error mx-3'>لا يوجد معلومات للعرض </span>
                            :
                            moufawadiyeh.map((mfd, index) => {
                                return (
                                    <span className="span-name">{mfd.name} <span onClick={() => handleShow(mfd._id, "mfd")} className='span-delete'>x</span> </span>
                                )
                            })
                        }

                    </div>
                    <div className="col-md-4 pt-md-3">
                        <form className="form-submit" onSubmit={onSubmit} >
                            <div className="mb-3 mx-4">
                                <label className="form-label">حدد إسم المفوضية</label>
                                <input onChange={handleMoufawad} type="text" placeholder='إسم المفوضية' required />
                                <button type="submit" >
                                    <FontAwesomeIcon style={{ color: "green" }} icon={faPlus} />

                                </button>
                                <span className='error '>{Error}</span>
                                <span className='success '>{Status}</span>
                            </div>
                        </form>


                    </div>
                </div>
            </Collapse>
            <Button className="add-button" onClick={() => accordionTwo()}>
                الأفواج في كشافة الإيمان
            </Button>
            <Collapse id="collapse" in={openTwo}>
                <div className="row p-0 m-0">
                    <div className="col-md-8 p-2">
                        <span className='error '>{Server}</span>

                        {!fawj.length ?
                            <span className='error mx-3'>لا يوجد معلومات للعرض </span>
                            :

                            fawj.map((fwj, index) => {
                                return (
                                    <span className="span-name">{fwj.name} <span onClick={() => handleShow(fwj._id, "fwj")} className='span-delete'>x</span> </span>
                                )
                            })
                        }

                    </div>
                    <div className="col -4 p-2">
                        <form className="form-submit" onSubmit={onSubmitFwj} >
                            <div className="mb-md-3 mx-md-4">
                                <label className="form-label">حدد إسم للفوج</label>
                                <input onChange={handelFwj} type="text" placeholder='إسم الفوج' required />
                                {!selectmfd ? <button type="submit" disabled >
                                    <FontAwesomeIcon style={{ color: "green" }} icon={faPlus} />
                                </button> :
                                    <button type="submit" >
                                        <FontAwesomeIcon style={{ color: "green" }} icon={faPlus} />
                                    </button>

                                }
                                <span className='error d-block'>{ErrorTwo}</span>
                                <span className='success d-block '>{StatusTwo}</span>
                            </div>
                            <div className="mb-md-3 mx-md-4">
                                <label className="form-label">حدد المفوضية</label>

                                <select value={selectmfd} onChange={handleSelectMfd} class="form-select form-select-sm w-50">
                                    {moufawadiyeh.map((mfd, index) => {
                                        return (
                                            <option selected value={mfd._id}>{mfd?.name}</option>
                                        )
                                    })}
                                    <option disabled={true} value="" selected >اختر المفوضية</option>

                                </select>
                            </div>
                        </form>


                    </div>
                </div>
            </Collapse>


            <div className="footer">
                <h4 className="text-center">جمعية كشافة الإيمان الإسلامية</h4>
            </div>
            <Modal className="modal-input" show={show} onHide={handleClose}>

                <Modal.Body>
                    <h4>هل تريد الحذف ؟</h4>
                    <div className="py-3">
                        {isDelete ? <button disabled class="btn btn-danger mx-2  " type="submit">جاري الحذف..</button>
                            :
                            // <button onClick={onDelete} class="btn btn-danger mx-2  " type="submit">حذف</button>
                            <button disabled class="btn btn-danger mx-2  " type="submit">هذا العملية غير متوفرة حاليا</button>

                        }
                        <button onClick={handleClose} class="btn btn-primary mx-2" type="submit">إلغاء</button>
                    </div>

                </Modal.Body>

            </Modal>
        </div >
    );
}

export default Add;
