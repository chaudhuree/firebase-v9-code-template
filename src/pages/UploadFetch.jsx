import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes
} from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { storage } from "../config/firebase";

function UploadFetch() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "projectFiles/");
  const uploadFile = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `projectFiles/${imageUpload.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);
    console.log(url);
    setImageUrls((prev) => [...prev, url]);
  };

  

  useEffect(() => {
    const fetchImages = async () => {
      const response = await listAll(imagesListRef);
      const promises = response.items.map((item) => getDownloadURL(item));
      const urls = await Promise.all(promises);
      setImageUrls((prev) => [...prev, ...urls]);
    };
    fetchImages();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 input-group my-3">
          <input
            type="file"
            className="form-control"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
        </div>
        <button className="btn btn-outline-warning btn-block mb-2" onClick={uploadFile}> Upload Image</button>
        <div className="col-12 my-4">
          {imageUrls.map((url, index) => {
            return <img className="img-fluid" key={index} src={url} alt={`uploaded_${index}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default UploadFetch;
