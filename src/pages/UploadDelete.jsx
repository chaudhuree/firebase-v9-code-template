import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes
} from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../config/firebase";

function UploadDelete() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "projectFiles/");

  const uploadFile = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `projectFiles/${imageUpload.name}`);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    console.log(snapshot?.ref);
    const url = await getDownloadURL(snapshot.ref);
    setImageUrls((prev) => [...prev, { url, ref: snapshot.ref }]);
    setImageUpload(null);
  };

  const deleteFile = async (index) => {
    const image = imageUrls[index];
    await deleteObject(image.ref);
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {

    const fetchImages = async () => {
      const response = await listAll(imagesListRef);
      const promises = response.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { url, ref: item };
      });
      const urls = await Promise.all(promises);
      setImageUrls((prev) => [...prev, ...urls]);
    };

    fetchImages();
  }, []);

  return (

    <div className="container my-4 text-center">
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload</button>
      
      {imageUrls.map((image, index) => {
        return (
          <div key={index}>
            <img src={image.url} alt={`uploaded_${index}`} />
            <button onClick={() => deleteFile(index)}>Delete Image</button>
          </div>
        );
      })}
    </div>
  );
}

export default UploadDelete;
