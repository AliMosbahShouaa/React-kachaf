import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
const ModalManag = (props) => {

  const [show, setShow] = useState(false);
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Date, setDate] = useState('');
  const [BloodType, setBloodType] = useState('');
  const [Number, setNumber] = useState('');
  const [PlaceBirth, setPlaceBirth] = useState('');
  const [Address, setAddress] = useState('');
  const [NbOfFamily, setNbOfFamily] = useState('');
  const [AddressType, setAddressType] = useState('');
  const [CurrentEducation, setCurrentEducation] = useState('');
  const [Hobbies, setHobbies] = useState('');
  const [Insurance, setInsurance] = useState('');
  const [Illness, setIllness] = useState('');
  const [FatherName, setFatherName] = useState('');
  const [FatherWork, setFatherWork] = useState('');
  const [FatherNumber, setFatherNumber] = useState('');
  const [FatherBloodType, setFatherBloodType] = useState('');
  const [MotherName, setMotherName] = useState('');
  const [MotherNumber, setMotherNumber] = useState('');
  const [MotherWork, setMotherWork] = useState('');
  const [MotherBloodType, setMotherBloodType] = useState('');
  const [Avatar, setAvatar] = useState(null);
  const [Position, setPosition] = useState('');
  const [Cloth, setCloth] = useState('');

  const [Fwj, setFwj] = useState('');
  const [Moufawadiyeh, setMoufawadiyeh] = useState('');
  const [Squad, setSquad] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);

  const [moufawadiyeh, setmoufawadiyeh] = useState([]);
  const [fawj, setFawj] = useState([]);
  const [squad, setsquad] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setError('');
  };

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleBloodType = (e) => setBloodType(e.target.value);
  const handleNumber = (e) => setNumber(e.target.value);
  const handlePlaceBirth = (e) => setPlaceBirth(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleNbOfFamily = (e) => setNbOfFamily(e.target.value);
  const handleAddressType = (e) => setAddressType(e.target.value);
  const handleCurrentEducation = (e) => setCurrentEducation(e.target.value);
  const handleHobbies = (e) => setHobbies(e.target.value);
  const handleInsurance = (e) => setInsurance(e.target.value);
  const handleIllnes = (e) => setIllness(e.target.value);
  const handleFatherName = (e) => setFatherName(e.target.value);
  const handleFatherNumber = (e) => setFatherNumber(e.target.value);
  const handleFatherWork = (e) => setFatherWork(e.target.value);
  const handleFatherBloodType = (e) => setFatherBloodType(e.target.value);
  const handleMotherName = (e) => setMotherName(e.target.value);
  const handleMotherWork = (e) => setMotherWork(e.target.value);
  const handleMotherBloodType = (e) => setMotherBloodType(e.target.value);
  const handleMotherNumber = (e) => setMotherNumber(e.target.value);
  const handleAvatar = (e) => setAvatar(e.target.files[0]);
  const handlePosition = (e) => setPosition(e.target.value);
  const handleCloth = (e) => setCloth(e.target.value);


  async function fetchMySquad() {
    let response = await fetch(`http://localhost:8080/api/get-squad-fawj/${Fwj}`)
    response = await response.json()
    setsquad(response.squad)

  }
  async function fetchMyFawj() {
    let response = await fetch(`http://localhost:8080/api/get-fawj/${Moufawadiyeh}`)
    response = await response.json()
    setFawj(response.fawj)
  }

  const handleFwj = (e) => setFwj(e.target.value);
  const handleMoufawadiyeh = (e) => setMoufawadiyeh(e.target.value);
  const handleSquad = (e) => setSquad(e.target.value);
  const onClickSquad = () => {
    fetchMySquad();
  }
  const onClickFawj = () => {
    fetchMyFawj();

  }
  useEffect(() => {
    async function fetchMyMoufawad() {
      let response = await fetch('http://localhost:8080/api/get-moufawadiyeh')
      response = await response.json()
      setmoufawadiyeh(response.moufawads)
    }

    fetchMyMoufawad()
  }, [])
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    setError('')

    let timer = null
    timer = setTimeout(() => {


      const formData = new FormData();
      formData.append('Position', Position);
      formData.append('Name', Name);
      formData.append('Email', Email);
      formData.append('Password', Password);
      formData.append('Date', Date);
      formData.append('BloodType', BloodType);
      formData.append('Number', Number);
      formData.append('PlaceBirth', PlaceBirth);
      formData.append('Address', Address);
      formData.append('NbOfFamily', NbOfFamily);
      formData.append('AddressType', AddressType);
      formData.append('CurrentEducation', CurrentEducation);
      formData.append('Hobbies', Hobbies);
      formData.append('Insurance', Insurance);
      formData.append('Illness', Illness);
      formData.append('FatherName', FatherName);
      formData.append('FatherWork', FatherWork);
      formData.append('FatherWork', FatherNumber);
      formData.append('FatherBloodType', FatherBloodType);
      formData.append('MotherName', MotherName);
      formData.append('MotherWork', MotherWork);
      formData.append('MotherWork', MotherNumber);
      formData.append('MotherBloodType', MotherBloodType);
      formData.append('moufawadiyeh', Moufawadiyeh);
      formData.append('file', Avatar);
      formData.append('Cloth', Cloth);
      formData.append('isAdmin', true);
      if (Fwj !== "") {
        formData.append('fawj', Fwj);
      }
      if (Squad !== "") {
        formData.append('squad', Squad);
      }
      axios({
        method: "post",
        url: `http://localhost:8080/api/register`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })

        .then(res => {
          props.getInfo();
          handleClose();
          setLoading(false)

        })

        .catch(err => {
          setError("لم تتم العملية راجع المدخلات")
          setLoading(false)
        })
    }, 1000);


  }

  return (
    <div>
      <button onClick={handleShow} className="span-model">+ إضافة</button>
      <Modal fullscreen={fullscreen} animation={false} show={show} onHide={handleClose}>
        <Modal.Header id="modal-header-kadeh" closeButton >
          <Modal.Title>إضافة قائد</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-body-kadeh">
          <form className="form-submit container model-manag " onSubmit={onSubmit} >
            <div className="row">
              <div className="mb-3 mx-0">
                <label className="form-label"> الصفة</label>

                <select onChange={handlePosition} class="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option value="" selected hidden disabled>اختيار </option>
                  <option value="leader">قائد</option>
                  <option value="helping leader">مساعد فائد</option>
                  <option value="amid">عميد</option>
                  <option value="moufawad">مفوض</option>
                </select>
              </div>
              {/* <h3 className="text-center py-1">المعلومات الشخصية</h3> */}
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">الإسم الكامل</label>
                <input onChange={handleName} type="text" placeholder='الإسم' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">البريد الإلكتروني</label>
                <input onChange={handleEmail} type="email" placeholder='example@hotmail.com' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">كلمة السر</label>
                <input onChange={handlePassword} type="password" placeholder='كلمة السر' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">تاريخ الميلاد</label>
                <input onChange={handleDate} type="Date" placeholder='25/07/1995' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">زمرة الدم</label>
                <input onChange={handleBloodType} type="text" placeholder='B+' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">رقم الهاتف</label>
                <input onChange={handleNumber} type="Number" placeholder='+961 000000' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">مكان الولادة</label>
                <input onChange={handlePlaceBirth} type="text" placeholder='مكان الولادة' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">العنوان</label>
                <input onChange={handleAddress} type="text" placeholder='العنوان' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">عدد أفراد الأسرة</label>
                <input onChange={handleNbOfFamily} type="text" placeholder='1-6' required className="form-control" />
              </div>

              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">المستوى الدراسي</label>
                <input onChange={handleCurrentEducation} type="text" placeholder='المستوى' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">هل يوجد أمراض</label>
                <input onChange={handleIllnes} type="text" placeholder='يجب تحديد نوع المرض' required className="form-control" />
              </div>

              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">الهواية</label>
                <input onChange={handleHobbies} type="text" placeholder='الهواية' required className="form-control" />
              </div>
              <div class="mb-3 mx-0 col-md-4">
                <label className='pb-3' for="validationCustom02">إضافة الصورة الشخصية</label>
                <input required onChange={handleAvatar} type="file" class="form-control" id="validationCustom02" />

              </div>
              {/* <h3 className="text-center py-1">معلومات الأب</h3> */}
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">إسم الأب</label>
                <input onChange={handleFatherName} type="text" placeholder='الإسم الكامل' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">رقم هاتف - الأب</label>
                <input onChange={handleFatherNumber} type="text" placeholder='الإسم الكامل' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">زمرة دم - الأب</label>
                <input onChange={handleFatherBloodType} type="text" placeholder='O+' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">العمل - الأب</label>
                <input onChange={handleFatherWork} type="text" placeholder='مكان العمل' required className="form-control" />
              </div>
              {/* <h3 className="text-center py-1">معلومات الأم</h3> */}
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">إسم الأم</label>
                <input onChange={handleMotherName} type="text" placeholder='الإسم الكامل' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">رقم هاتف - الأم</label>
                <input onChange={handleMotherNumber} type="text" placeholder='الإسم الكامل' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">زمرة دم - الأم</label>
                <input onChange={handleMotherBloodType} type="text" placeholder='A+' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">العمل - الأم</label>
                <input onChange={handleMotherWork} type="text" placeholder='مكان العمل' required className="form-control" />
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">التأمين</label>
                <select onChange={handleInsurance} class="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option value="" selected hidden disabled>اختيار </option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">نوع السكن</label>

                <select onChange={handleAddressType} class="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option value="" selected hidden disabled>اختيار </option>
                  <option value="ملك">ملك</option>
                  <option value="أجار">أجار</option>
                </select>
              </div>
              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">هل يملك لباس كشفي ؟</label>

                <select onChange={handleCloth} class="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option value="" selected hidden disabled>اختيار </option>
                  <option value="true">نعم</option>
                  <option value="false">كلا</option>
                </select>
              </div>

              <div className="mb-3 mx-0 col-md-4">
                <label className="form-label">المفوضية</label>
                <select value={Moufawadiyeh} onChange={handleMoufawadiyeh} class="form-select form-select-sm" aria-label=".form-select-sm example">

                  {moufawadiyeh.map((mfd, index) => {
                    return (
                      <option value={mfd._id}>{mfd.name}</option>
                    )
                  })}
                  <option value="" selected disabled>اختيار </option>

                </select>
              </div>




              {Position === "moufawad" ?
                <div className="mb-3 mx-0 col-md-4">
                  <span></span>
                </div> :
                <div className="mb-3 mx-0 col-md-4">
                  <label className="form-label">الفوج</label>

                  {!Moufawadiyeh ?
                    <select disabled value={Fwj} onChange={handleFwj} class="form-select form-select-sm" aria-label=".form-select-sm example">
                      {fawj.map((fwj, index) => {
                        return (

                          <option value={fwj._id}>{fwj.name}</option>
                        )
                      })}
                      <option value="" selected disabled>اختيار </option>

                    </select> :
                    <select onClick={onClickFawj} value={Fwj} onChange={handleFwj} class="form-select form-select-sm" aria-label=".form-select-sm example">
                      {fawj.map((fwj, index) => {
                        return (

                          <option value={fwj._id}>{fwj.name}</option>
                        )
                      })}
                      <option value="" selected disabled>اختيار </option>

                    </select>}

                </div>}






              {Position === "amid" || Position === "moufawad" ?
                <div className="mb-3 mx-0 col-md-4">
                  <span></span>

                </div> :
                <div className="mb-3 mx-0 col-md-4">
                  <label className="form-label">الفرقة</label>

                  {!Fwj ?
                    <select disabled value={Squad} onChange={handleSquad} class="form-select form-select-sm" aria-label=".form-select-sm example">
                      {squad.map((squad, index) => {
                        return (

                          <option value={squad._id}>{squad.name}</option>
                        )
                      })}
                      <option value="" selected disabled>اختيار </option>

                    </select> :
                    <select onClick={onClickSquad} value={Squad} onChange={handleSquad} class="form-select form-select-sm" aria-label=".form-select-sm example">
                      {squad.map((squad, index) => {
                        return (

                          <option value={squad._id}>{squad.name}</option>
                        )
                      })}
                      <option value="" selected disabled>اختيار </option>

                    </select>}

                </div>}



            </div>

            <button class="btn btn-success" type="submit">+ إضافة</button>
            {loading ? (<div class="spinner-border mx-3" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>) : <div>            <h4 className="error text-center py-2">{error}</h4>
            </div>}




          </form>
        </Modal.Body>

      </Modal>

    </div >
  );

}

export default ModalManag;
