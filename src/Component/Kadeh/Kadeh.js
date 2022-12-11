import { Component } from 'react';
import Header from './ModalManag';
import { Link } from 'react-router-dom';
import image1 from '../../kachaf22.png'
import ModalManag from './ModalManag';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faQuestion, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import ali from '../../aliii.jpg'

class Kadeh extends Component {
  state = {
    kadeh: [],
    isLoading: false,
    error: '',
    isDelete: false,
    show: false,
    idDelete: '',
    openOne: false,
    openTwo: false,
    openThree: false,
    openFour: false,
    showUser: false
  }


  setId = (id) => {
    localStorage.setItem("idUser", id)
    this.setState({
      showUser: true
    })
  }

  handleClosUser = () => {
    this.setState({
      showUser: false
    })
  }

  handleClose = () => {
    this.setState({
      show: false
    })
  };
  handleShow = (id) => {
    this.setState({
      show: true,
      idDelete: id
    })
  };
  accordionOne = (e) => {
    this.setState({
      openOne: !this.state.openOne
    })

  }
  accordionTwo = (e) => {
    this.setState({
      openTwo: !this.state.openTwo
    })

  }
  accordionThree = (e) => {
    this.setState({
      openThree: !this.state.openThree
    })

  }

  accordionFour = (e) => {
    this.setState({
      openFour: !this.state.openFour
    })

  }

  getInfo = async () => {

    fetch(`http://localhost:8080/api/get-users-management`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          kadeh: data.user,
          isLoading: true
        });

      })
  }
  componentDidMount() {
    this.getInfo();

  }
  onDelete = () => {
    this.setState({
      isDelete: true
    })
    let id = this.state.idDelete
    axios.post(`http://localhost:8080/api/delete-user/${id}`)
      .then(res => {
        this.getInfo();
        this.handleClose();
        this.setState({
          isDelete: false
        })
      })

      .catch(err => {
        this.setState({
          error: err.response.data.message,
          isDelete: false
        })
      })
  }
  render() {
    console.log(this.state.kadeh)
    const kadehleader = this.state.kadeh.filter((kadeh) => {
      return kadeh.Position === "leader"
    })
    const kadehamid = this.state.kadeh.filter((kadeh) => {
      return kadeh.Position === "amid"
    })
    const kadehmoufawad = this.state.kadeh.filter((kadeh) => {
      return kadeh.Position === "moufawad"
    })
    const kadehHelping = this.state.kadeh.filter((kadeh) => {
      return kadeh.Position === "helping leader"
    })
    return (
      <div className="kadeh">
        <div className="Header">
          <div className='row p-0 m-0' style={{ direction: "ltr" }}>
            <div className="col-4">
              <img src={image1} alt="not found" />
            </div>
            <div className="col-8">
              <h1>جمعية كشافة الإيمان الإسلامية - إدارة القادة</h1>
            </div>
          </div>
        </div>
        <Modal className="modal-input" show={this.state.show} onHide={this.handleClose}>

          <Modal.Body>
            <h4>هل تريد الحذف ؟</h4>
            <div className="py-3">
              {this.state.isDelete ? <button disabled class="btn btn-danger mx-2  " type="submit">جاري الحذف..</button>
                : <button onClick={this.onDelete} class="btn btn-danger mx-2  " type="submit">حذف</button>
              }
              <button onClick={this.handleClose} class="btn btn-primary mx-2" type="submit">إلغاء</button>
            </div>

          </Modal.Body>

        </Modal>

        <ModalManag getInfo={this.getInfo} />

        <div className="container">
          <div className='row pt-3'>
            <div className="col-md-6 my-3">
              <h4 onClick={this.accordionOne}>
                القادة</h4>
              <Modal id="collapse" onHide={this.accordionOne} show={this.state.openOne}>
                <Modal.Header >
                  <Modal.Title> القادة</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <table class="table table-striped">

                    <tbody>
                      {!this.state.isLoading ?
                        <div className='text-center loading-kadeh'>
                          <h3 >الرجاء الإنتظار..</h3>
                          <div class="spinner-border " role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                        :

                        !kadehleader.length ? <div className="not-found">لا يوجد معلومات</div> : kadehleader.map((kadeh, index) => {

                          return (

                            <tr>
                              <th ><img className=" img-kadeh" src={`http://localhost:8080/` + kadeh.file.split('\\')[1]} /></th>
                              <th scope="row">{kadeh.Name}</th>
                              <th scope="row">{kadeh.fawj.name}</th>
                              <th style={{ cursor: "pointer" }} onClick={() => this.setId(kadeh._id)} scope="row" ><FontAwesomeIcon icon={faQuestion} /></th>
                              <th onClick={() => this.handleShow(kadeh._id)} className="delete"><FontAwesomeIcon icon={faTrash} /></th>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>

                </Modal.Body>
              </Modal>

            </div>
            <div className="col-md-6 my-3">
              <h4 onClick={this.accordionTwo}>  العُمداء</h4>

              <Modal id="collapse" onHide={this.accordionTwo} show={this.state.openTwo}>
                <Modal.Header >
                  <Modal.Title> العمداء</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <table class="table table-striped">

                    <tbody>
                      {!this.state.isLoading ?
                        <div className='text-center loading-kadeh'>
                          <h3>الرجاء الإنتظار..</h3>
                          <div class="spinner-border " role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                        :

                        !kadehamid.length ? <div className="not-found">لا يوجد معلومات</div> : kadehamid.map((kadeh, index) => {

                          return (

                            <tr>
                              <th ><img className=" img-kadeh" src={`http://localhost:8080/` + kadeh.file.split('\\')[1]} /></th>

                              <th scope="row">{kadeh.Name}</th>
                              <th scope="row">{kadeh.fawj.name}</th>
                              <th style={{ cursor: "pointer" }} onClick={() => this.setId(kadeh._id)} scope="row" ><FontAwesomeIcon icon={faQuestion} /></th>
                              <th onClick={() => this.handleShow(kadeh._id)} className="delete"><FontAwesomeIcon icon={faTrash} /></th>
                            </tr>
                          )

                        })


                      }
                    </tbody>
                  </table>

                </Modal.Body>

              </Modal>
            </div>
            <div className="col-md-6 my-3">
              <h4 onClick={this.accordionThree}>  المفوّض</h4>
              <Modal id="collapse" onHide={this.accordionThree} show={this.state.openThree}>
                <Modal.Header >
                  <Modal.Title> المفوّض</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <table class="table table-striped">

                    <tbody>
                      {!this.state.isLoading ?
                        <div className='text-center loading-kadeh'>
                          <h3 >الرجاء الإنتظار..</h3>
                          <div class="spinner-border " role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                        :
                        !kadehmoufawad.length ? <div className="not-found">لا يوجد معلومات</div> : kadehmoufawad.map((kadeh, index) => {

                          return (

                            <tr>
                              <th ><img className=" img-kadeh" src={`http://localhost:8080/` + kadeh.file.split('\\')[1]} /></th>
                              <th scope="row">{kadeh.Name}</th>
                              <th scope="row">{kadeh.fawj.name}</th>
                              <th style={{ cursor: "pointer" }} onClick={() => this.setId(kadeh._id)} scope="row" ><FontAwesomeIcon icon={faQuestion} /></th>
                              <th onClick={() => this.handleShow(kadeh._id)} className="delete"><FontAwesomeIcon icon={faTrash} /></th>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>

                </Modal.Body>

              </Modal>
            </div>
            <div className="col-md-6 my-3">
              <h4 onClick={this.accordionFour}>مساعد قائد</h4>
              <Modal id="collapse" onHide={this.accordionFour} show={this.state.openFour}>
                <Modal.Header >
                  <Modal.Title> مساعد قائد</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <table class="table table-striped">

                    <tbody>
                      {!this.state.isLoading ?
                        <div className='text-center loading-kadeh'>
                          <h3 >الرجاء الإنتظار..</h3>
                          <div class="spinner-border " role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                        :
                        !kadehHelping.length ? <div className="not-found">لا يوجد معلومات</div> : kadehHelping.map((kadeh, index) => {

                          return (

                            <tr>
                              <th ><img className=" img-kadeh" src={`http://localhost:8080/` + kadeh.file.split('\\')[1]} /></th>
                              <th scope="row">{kadeh.Name}</th>
                              <th scope="row">{kadeh.fawj.name}</th>
                              <th style={{ cursor: "pointer" }} onClick={() => this.setId(kadeh._id)} scope="row" ><FontAwesomeIcon icon={faQuestion} /></th>
                              <th onClick={() => this.handleShow(kadeh._id)} className="delete"><FontAwesomeIcon icon={faTrash} /></th>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>

                </Modal.Body>

              </Modal>

              
          <Modal className="modal-input" show={this.state.showUser} onHide={this.handleClosUser}>

            <Modal.Body>
              <h4>هل تريد رؤية معلومات المستخدم ؟</h4>
              <div className="py-3">
                <Link to="/onsore-one">
                  <button class="btn btn-danger mx-2  " type="submit">الذهاب</button>
                </Link>
                <button onClick={this.handleClosUser} class="btn btn-primary mx-2" type="submit">إلغاء</button>
              </div>

            </Modal.Body>

          </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Kadeh;
