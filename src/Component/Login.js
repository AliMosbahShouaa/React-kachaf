import { Component } from 'react';
import axios from 'axios';
import image from '../kachaf.jpg';

class Login extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        isLoading: false,

    }
    ChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }
    ChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }


    onSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: !this.state.isLoading, error: '' });
        let timer = null
        timer = setTimeout(() => {

            let data = {
                Email: this.state.email,
                Password: this.state.password
            }
            axios.post('http://localhost:8080/api/login', data)
                .then(res => {
                    if (res.data.message === 'تم تسجيل الدخول بنجاح') {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('_id', res.data.data._id);
                        localStorage.setItem('mfdId', res.data.data.moufawadiyeh);

                        axios.defaults.headers.common = { 'Authorization': res.data.token };
                        window.location = "http://localhost:3000/home"

                    }
                    else {
                        this.setState({
                            error: "هناك خطأ راجع المدخلات",
                            isLoading: !this.state.isLoading
                        });
                    }
                })


        }, 1000);

    }

    render() {
        return (
            <div >
                <div className="body">
                    <div className="container home">

                        <div className="image" >
                            <img src={image} alt="not found" />
                            <h2 className='py-4 text-center'>جمعية كشافة الإيمان الإسلامية</h2>

                        </div>
                        <div className="login">
                            <form className="container py-2" onSubmit={this.onSubmit}>
                                <h5 className="py-1 error text-center">{this.state.error}</h5>
                                <div className="mb-3">
                                    <label className="form-label">البريد الالكتروني</label>
                                    <input type="email" className="form-control" onChange={this.ChangeEmail} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">كلمة المرور</label>
                                    <input type="password" className="form-control" onChange={this.ChangePassword} required />
                                </div>

                                {this.state.isLoading ? <input disabled style={{ backgroundColor: "#2f4f4f", color: "white" }} type="submit" value="جاري التسجيل.." className="btn mt-3" />
                                    :
                                    <input style={{ backgroundColor: "#2f4f4f", color: "white" }} type="submit" value="تسجيل " className="btn mt-3" />
                                }

                            </form>
                        </div>



                    </div>
                </div>

            </div>
        );
    }
}

export default Login;
