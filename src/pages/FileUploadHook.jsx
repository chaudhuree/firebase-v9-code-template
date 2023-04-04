import { ref } from 'firebase/storage';
import React, { useState } from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { storage } from '../config/firebase';


export default function FileUploadHook() {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [selectedFile, setSelectedFile] = useState();
  const fileUploadRef = ref(storage, `projectFiles/${selectedFile?.name}`);

  const upload = async () => {
    if (selectedFile) {
      const result = await uploadFile(fileUploadRef, selectedFile);
     console.log(result);
     console.log(result?.ref?._location?.path_);
    }
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-12 text-center mb-3">
          {error && <strong>Error: {error.message}</strong>}
          {uploading && <span>Uploading file...</span>}
          {snapshot && <span>Snapshot: {JSON.stringify(snapshot)}</span>}
          <p>{selectedFile && <span>Selected file: {selectedFile.name}</span>}</p>
          <br />
        </div>
        <div className="col-12 my-3 input-group">

          <input className='form-control'
            type="file"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : undefined;
              setSelectedFile(file);
            }}
          />
        </div>
        <button className="btn btn-outline-success btn-block mb-2" onClick={upload}>Upload file</button>

      </div>
    </div>
  )
}