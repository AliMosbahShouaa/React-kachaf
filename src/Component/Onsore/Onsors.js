import { Component } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../kachaf22.png';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

class Onsors extends Component {
  state = {
    onsors: [],
    isLoading: false,
    error: '',
    show: false,
    idDelete: '',
    search: '',
    isDelete: false,
    serial: '',
    moufawadiyeh: [],
    mfd: '',
    fawjs: [],
    fwj: '',
    showUser: false
  }
  ChangeMfd = (e) => {
    this.setState({
      mfd: e.target.value,
      isLoading: true
    })
    let timer = null
    timer = setTimeout(() => {
      this.getSelectMfd();
      this.getFawj();

      this.setState({
        isLoading: false
      })
    }, 1000);

  }
  ChangeFawj = (e) => {
    this.setState({
      fwj: e.target.value,
      isLoading: true
    })
    let timer = null
    timer = setTimeout(() => {
      this.getSelectFawj();
      this.getFawj();

      this.setState({
        isLoading: false
      })
    }, 1000);

  }
  searchHandler = (e) => {
    this.setState({
      search: e.target.value
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
  ChangeSerial = (e) => {
    this.setState({
      serial: e.target.value
    })
  }
  getFawj = async () => {

    fetch(`http://localhost:8080/api/get-fawj/${this.state.mfd}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          fawjs: data.fawj,
        });
      })
  }
  getMfd = async () => {

    fetch(`http://localhost:8080/api/get-moufawadiyeh`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          moufawadiyeh: data.moufawads,
        });
      })
  }
  getInfo = async () => {

    fetch(`http://localhost:8080/api/get-users`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          onsors: data.user,
          isLoading: true
        });
      })
  }
  getSelectMfd = async () => {
    if (this.state.mfd === "") {
      this.getInfo();
    }
    fetch(`http://localhost:8080/api/get-user-mfd/${this.state.mfd}`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          onsors: data.user,
          isLoading: true
        });
      })

  }
  getSelectFawj = async () => {
    if (this.state.fwj === "") {
      this.getSelectMfd();
    }
    fetch(`http://localhost:8080/api/get-user-fawj/${this.state.fwj}`, {
      method: 'POST'
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
    this.getMfd()
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
  onSerial = (id) => {
    if (this.state.serial === "") {
      return
    }
    let data = {
      SerialNumber: this.state.serial
    }

    axios.post(`http://localhost:8080/api/add_Serial/${id}`, data)
      .then(res => {
        this.getInfo();
        this.setState({
          serial: ""
        })
      })

      .catch(err => {
        this.setState({
          error: err.response.data.message
        })
      })
  }

  setId = (id) => {
    localStorage.setItem("idUser" , id)
    this.setState({
      showUser : true
    })
  }

  handleClosUser = () => {
    this.setState({
      showUser : false
    })
  }
  render() {
    const onsorsInfo = this.state.onsors.filter((kadeh) => {
      return kadeh.Position === "onsor"
    })
    return (
      <div className="onsors">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <h5>إدارة العناصر</h5>
            </div>
            <div className="col-md-8 p-0 m-0">
              <ul className="filter-search">
                <span>    المفوضية :</span>
                <li>
                  <select onChange={this.ChangeMfd} class="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="">الكل</option>
                    {this.state.moufawadiyeh.map((mfd, index) => {
                      return (
                        <option value={mfd._id}>{mfd.name}</option>
                      )
                    })}
                  </select>
                </li>
                <span>  الأفواج :</span>
                {!this.state.fawjs.length || this.state.mfd === "" ?
                  <li>
                    <select disabled class="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option selected>يجب تحديد المفوضية </option>

                    </select>
                  </li> :
                  <li>
                    <select onChange={this.ChangeFawj} class="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option value="">جميع الأفواج</option>
                      {this.state.fawjs.map((fawj, index) => {
                        return (
                          <option value={fawj._id}>{fawj.name}</option>
                        )
                      })}
                    </select>
                  </li>}
                {/* <li>
                  <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option selected>الفرقة</option>
                    <option value="1">فرقة الأشبال</option>
                    <option value="2">فرقة الفتيان</option>
                    <option value="3">فرقة المتقدم</option>
                  </select>

                </li> */}
              </ul>
              <br />
              <div >
                <input value={this.state.search} onChange={this.searchHandler} className="form-control" type="search" placeholder="ابحث حسب الإسم  " aria-label="Search" />
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
              <div className="list">
                <h4>العناصر المنتسبين</h4>
                <div id="table-wrapper">
                  <div id="table-scroll">
                    <table class="table table-striped onsores ">

                      <tbody>
                        {!this.state.isLoading ?
                          <div style={{ padding: "100px 0" }} className='text-center'>
                            <h3 >الرجاء الإنتظار..</h3>
                            <div class="spinner-border " role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>
                          :
                          onsorsInfo.filter((item) => {
                            if (this.state.search === "") {
                              return item
                            } else if (item.Name.toLowerCase().includes(this.state.search?.toLowerCase())) {
                              return item
                            }
                          }).filter((ons, index) => {
                            return ons.Position === "onsor"
                          })
                            .map((onsor, index) => {
                              return (
                                <tr>
                                  {onsor.SerialNumber ?
                                    <th scope="row">{onsor.SerialNumber}</th> :
                                    <th scope="row">
                                      <input className="serial" type="text" onChange={this.ChangeSerial} />
                                    </th>
                                  }
                                  <th onDoubleClick={() => this.onSerial(onsor._id)} scope="row">{onsor.Name}</th>
                                  <th style={{cursor : "pointer"}} className='show' onClick={() => this.setId(onsor._id)}>
                                    معلومات العنصر

                                  </th>
                                  <th onClick={() => this.handleShow(onsor._id)} className="delete">حذف</th>
                                </tr>
                              )
                            })
                        }
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 image-onsor">
              <img src={image1} alt="not found" />
            </div>
          </div>

          <div>
            <h4 className="text-center onsors-h4">جمعية كشافة الإيمان الإسلامية</h4>
          </div>

          <Modal className="modal-input" show={this.state.showUser} onHide={this.handleClosUser}>

            <Modal.Body>
              <h4>هل تريد رؤية معلومات العنصر ؟</h4>
              <div className="py-3">
                <Link to="/onsore-one">
                  <button class="btn btn-danger mx-2  " type="submit">الذهاب</button>
                </Link>
                <button onClick={this.handleClosUser} class="btn btn-primary mx-2" type="submit">إلغاء</button>
              </div>

            </Modal.Body>

          </Modal>
        </div>
      </div >
    );
  }
}

export default Onsors;
