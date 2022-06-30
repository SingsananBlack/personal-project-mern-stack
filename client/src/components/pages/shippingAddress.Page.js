import React, { useState } from 'react';
// React-router-dom
import { useNavigate } from 'react-router-dom'
// React-quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// React-toatify
import { toast } from 'react-toastify'
// Redux
import { useSelector } from 'react-redux';
// Components
import NavbarUser from '../layouts/navbar.User';
// Functions 
import { saveAddress } from '../functions/users.Function'

const ShippingAddress = () => {
  const navagate = useNavigate()
  const { user } = useSelector((state)=>({...state}))
  const [address, setAddress] = useState('');
  // const [addressSaved, setAddressSaved] = useState(false);

  const handleSaveAddress = () => {
    if (!address) {
      toast.error('Please enter your address');
    } else {
      saveAddress(user.token, address).then((res) => {
        console.log(res);
        navagate('/check_out');
      });
    }
  };

  return (
    <>
      <NavbarUser />
      <div className="shipping-address-box">
        <h2>Shipping Address</h2>
        <div className="address-box">
          <ReactQuill
            value={address}
            onChange={setAddress}
            placeholder="ตัวอย่าง : 123/78 ตำบล/แขวง คลองสาน อำเภอ/เขต คลองสาน กรุงเทพมหานคร ประเทศไทย 10600 "
          />
        </div>
        <button style={{fontWeight:'700'}} onClick={handleSaveAddress}>Continue</button>
      </div>
    </>
  );
};

export default ShippingAddress;
