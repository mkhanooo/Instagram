import React , { useState } from 'react';           
import {Button} from '@material-ui/core';
import {db , storage} from './firebase.js';
import firebase from 'firebase';
import './ImageUpload.css';

function ImgUpload({username}) {
    const [caption , setCaption] = useState('');
    const [image, setImage] = useState(null);
    //const [url, setUrl] = useState(" ");
    const [progress,setProgress] = useState(0);

    const handleChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) =>{
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collection("posts").add({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        caption : caption,
                        imgUrl : url,
                        username : username
                    });

                    setProgress(0);
                    setCaption('');
                    setImage(null);
                });
            }
        )
    }
    return (
        <div className='ImageUpload'> 
            <progress className= 'ImageUpload__progress' value ={progress} max="100" />
            <input type = "text" placeholder = "Enter a Caption" onChange={event => setCaption(event.target.value)} />
            <input type = "file" onChange = {handleChange} />
            <Button onClick={handleUpload} variant='contained' color='secondry' >
                Upload
            </Button>
        </div>
    )
}

export default ImgUpload
























// ------------------------------------------------------------
// import { Button } from "@material-ui/core";
// import React, { useState } from "react";
// import firebase from 'firebase';
// import { storage, db  } from "./firebase";



// function ImageUpload(username) {
//   const [image, setImage] = useState(null);

//   const [progress, setProgress] = useState(0);
//   const [caption, setCaption] = useState("");

//   const handleChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };
//       const handleUpload = () =>{
//           const uploadTask = storage.ref(`images/${image.name}`).put(image);
//           uploadTask.on(
//             "state_changed",
//             (snapshot) => {
//               // progress function
//                 const progress = Math.round(
//                   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//                 );
//                 setProgress(progress);
//             },
//             (error) => {
//               // error function
//               console.log(error);
//               alert(error.message);
//             },
//             () => {
//                 // complete function
//                 storage
//                 .ref("images")
//                 .child(image.name)
//                 .getDownloadURL()
//                 .then(url => {
//                   // post image inside db
//                   db.collection("posts").add({
//                     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//                     caption: caption,
//                     imgUrl: url,
//                     username: username
//                   });
//                   setProgress(0);
//                   setCaption("");
//                   setImage(null);
//                 });

//             }

//           )
//       }
//   return (
//     <div>
//       {/* i want to do these thing  */}
//       {/* caption input */}
//       {/* file picker */}
//       {/* post button */}

//       <progress value={progress} max='100'  />
//       <input
//         type="text"
//         placeholder="Enter a caption..."
//         onChange={(event) => setCaption(event.target.value)}
//         value={caption}
//       />
//       <input type="file" onChange={handleChange} />
//       <Button onclick={handleUpload} >Upload</Button>
//     </div>
//   );
// }

// export default ImageUpload;
