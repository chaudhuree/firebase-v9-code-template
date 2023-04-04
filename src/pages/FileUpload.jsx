import { ref, uploadBytes } from "firebase/storage";
import React from 'react';
import { storage } from '../config/firebase';

export default function FileUpload() {
  const [file, setFile] = React.useState(null)


  const uploadFile = async () => {
    if (!file) return;
    const filesFolderRef = ref(storage, `projectFiles/${file.name}`);
    try {
      const data = await uploadBytes(filesFolderRef, file);
      console.log("data from FileUpload:", data);
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div className="container">
      <p>Upload in Storage:</p>
      <div className="row mt-3">
        <div className="col mb-3 input-group">
          <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} />
        </div>
        <button className="btn btn-outline-success btn-block mb-2" onClick={uploadFile}>upload image</button>
      </div>
    </div>
  )
}
