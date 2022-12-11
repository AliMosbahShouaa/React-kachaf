import { Component } from 'react';
import { Link } from 'react-router-dom';
import ali from '../../aliii.jpg';
import ShowOne from '../Onsore/Show/ShowOne';
import ShowTwo from '../Onsore/Show/ShowTwo'
import ShowTree from '../Onsore/Show/ShowTree';
import ShowFourth from '../Onsore/Show/ShowFourth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

class OnsoreOne extends Component {


    state = {
        counter: 0,
        onsore: []
    }

    Plus = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }
    Minize = () => {
        this.setState({
            counter: this.state.counter - 1
        })
    }
    getInfo = async () => {
        let id = localStorage.getItem("idUser")
        fetch(`http://localhost:8080/api/get-one-user/${id}`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    onsore: data.user,
                });
            })
    }
    componentDidMount() {
        this.getInfo();
    }
    render() {
        console.log("location.pathname")
        let onsore = this.state.onsore
        return (
            <div className="onsore-one">
                <div className="container">
                    <div className="row">
                        <div className='col-md-4 image-info text-center'>
                            <img className="rounded-circle" src={ali} alt="not found" />
                            <h2 >{onsore.Name}</h2>
                            {onsore.taliaa ?
                                <h4>طليعة : {onsore.taliaa?.name}</h4> :
                                <h4>--</h4>}
                            <h3 >{onsore.squad?.name}</h3>
                            <div className="text-center pt-3">
                                {this.state.counter === 0 ?
                                    <button disabled className='btn btn-secondary mx-2'><FontAwesomeIcon icon={faArrowRight} /></button>
                                    :
                                    <button onClick={this.Minize} className='btn btn-secondary mx-2'><FontAwesomeIcon icon={faArrowRight} /></button>
                                }
                                {this.state.counter === 3 ?
                                    <button disabled className='btn btn-secondary mx-2'><FontAwesomeIcon icon={faArrowLeft} /></button>
                                    :
                                    <button onClick={this.Plus} className='btn btn-secondary mx-2'><FontAwesomeIcon icon={faArrowLeft} /></button>
                                }
                            </div>
                        </div>
                        <div className='col-md-8 pt-3'>
                            <div className='field'>
                                <h2 className="text-center">معلومات المستخدم </h2>

                                {this.state.counter === 0 ?
                                    <ShowOne onsore={onsore} /> :
                                    this.state.counter === 1 ?
                                        <ShowTwo onsore={onsore} /> :
                                        this.state.counter === 2 ? <ShowTree onsore={onsore} /> :
                                            this.state.counter === 3 ? <ShowFourth onsore={onsore} /> : <div></div>
                                }
                            </div>


                        </div>
                        <h4 style={{ color: "rgb(31, 126, 31)", paddingTop: "25px", fontFamily: "self3" }} className="text-center">جمعية كشافة الإيمان الإسلامية</h4>

                    </div>
                </div>
            </div>
        );
    }
}

export default OnsoreOne;
