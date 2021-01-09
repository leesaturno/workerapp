import React, {Component} from 'react';
import './Perfil.scss';
import CardAmplio from '../../component/Card/CardAmplio';
import Footer from '../../component/Footer/Footer';

import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('¡Solo puede cargar archivos JPG / PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('¡La imagen debe ser inferior a 2 MB!');
    }
    return isJpgOrPng && isLt2M;
  }
 

export default class Perfil extends Component {

    state = {
        loading: false,
      };
    
      handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };


    render(){
        const { loading, imageUrl } = this.state;
        const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
        );

        return (
            <div>
                <div className="main mt-5 ml-10">
                    <CardAmplio 
                        title="Perfil"
                        content={
                            <form>
                                <div className="ed-grid lg-grid-3">
                                    <div className="form-group">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="#"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                    </div>

                                    <div className="form-group">
                                        <label className="text-ups">Usuario</label>
                                        <input type="text" name="user" className="form-control" /> 
                                    </div>

                                    <div className="form-group">
                                        <label className="text-ups">Correo</label>
                                        <input type="email" name="email" className="form-control" />
                                    </div>
                                </div>

                                <br/><br/>

                            <div className="ed-grid lg-grid-2">
                                <div className="form-group">
                                <label className="text-ups">Cumpleaños</label>
                                <input type="date" name="cumple" className="form-control" /> 
                                </div>
                                <div className="form-group">
                                <label className="text-ups">Nombre</label>
                                <input type="text" name="nombres" className="form-control" /> 
                                </div>
                                
                            </div>
                            
                            <div className="ed-grid lg-grid-2">
                                <div className="form-group">
                                <label className="text-ups">Tel&#233;fono</label>
                                <input type="tel" name="phone" className="form-control" /> 
                                </div>
        
                                <div className="form-group">
                                <label className="text-ups">Celular</label>
                                <input type="tel" name="phone" className="form-control" /> 
                                </div>
                            </div>
                            
                            
                            <div className="ed-grid">
                                <div className="form-group">
                                <label className="text-ups">Direcci&#243;n</label>
                                <input name="cReferencia" className="form-control" type="text" />
                                </div>
                            </div>
                            
            
                            <button className="bttn btn-CB text-ups">Procesar</button>
                        </form>
                        }
                    />

                </div>

                <Footer/>
            </div>
        );
    }
}
