import React from 'react';
import axios from 'axios';
// Use react-image-file-resizer
import Resize from 'react-image-file-resizer';
// Use react-spinners
// import RingLoader from 'react-spinners/RingLoader';
// Redux
import { useSelector } from 'react-redux';

const FileUploadAdmin = ({values,setValues}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangeFile = (event) => {
    const files = event.target.files;
    if (files) {
      let allFileUpload = values.image;
      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (url) => {
            axios
              .post(
                process.env.REACT_APP_API + '/image',
                {
                  image: url,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                allFileUpload.unshift(res.data);
                // console.log('allFileUpload in then', allFileUpload);
                setValues({ ...values, image: allFileUpload });
                console.log('Upload', res);
              })
              .catch((err) => {
                console.log(err);
              });
          },
          'base64'
        );
      }
    }
  };

  const handleDelete = (public_id) => {
    const { image } = values
    axios.post(process.env.REACT_APP_API + '/delete_image', {public_id},{
      headers: {
        authtoken: user.token
      }
    }).then(res=>{
      let filterImage = image.filter(item=>{
        return item.public_id !== public_id
      })
      setValues({...values, image: filterImage})
      console.log('Delete', res);
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className="img-card">
      <div className="img-top">
        <p>
          Cover image upload
          <span
            style={{ fontSize: '14px', color: 'orange', marginLeft: '5px' }}
          >
            (Warning: 1 image per product only.)
          </span>
        </p>
      </div>
      <div className="pre-img-form">
        <input
          type="file"
          name="image"
          className="img-file"
          accept="images/*"
          onChange={handleChangeFile}
          required
        />
      </div>
      {values.image &&
        values.image.map((item,index) => (
          <div className="img-container" key={index}>
            <div className="img-preview" key={item.public_id}>
                <img src={item.url} alt="" />
                <span onClick={() => handleDelete(item.public_id)}>
                  &times;
                </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FileUploadAdmin;
