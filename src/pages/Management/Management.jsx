import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../../contexts/AuthGoogleProvider";
import { db, storage } from '../../services/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useForm } from 'react-hook-form';
import { Header } from '../../components/Header/Header';

import "../../css/App.css";

export const Management = () => {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState({})
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const { userId } = useContext(AuthGoogleContext);
  const [refresh, setRefresh] = useState(false);

  const IdsArray = firestoreLoading ? [] : users?.map((user) => user.id)

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  // console.log(imageUrl, userId);

  // Upload image
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${userId}/vehiclePicture`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    })
  }

  // Load image
  useEffect(() => {
    const currentId = IdsArray?.indexOf(userId)
    setImageUrl(users[currentId]?.imgUrl)
  }, [firestoreLoading])

  // Hook Form Controller
  const {
    watch,
    register,
    setValue,
    getValues
  } = useForm({
    mode: "all",
  });
  
  // Firestore loading
  const [value, loading, error] = useCollection(usersCollectionRef,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  useEffect(() => {
    setFirestoreLoading(loading);
  }, [loading])

  // Users Data
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers();
    
  }, [refresh])

   // Already Exists ?
  useEffect(() => {
    if(firestoreLoading) {
      return;
    } else {
      const handleAlreadyExists = () => {
        setAlreadyRegistered(IdsArray.includes(userId))
      }
      handleAlreadyExists();
    }
  }, [IdsArray])

  // Create user data
  async function registerUser() {
    const docRef = doc(db, "users", userId);

    return await setDoc(docRef, {
      displayName: watch("displayName"),
      phone: watch("phoneNumber"),
      size: watch("vehicleSize"),
      isCovered: watch("covered"),
      additionalInfo: watch("additionalInfo"),
      imgUrl: imageUrl,
    })
    .then(
      setRefresh((current) => !current),
      console.log("Registered"),
      setTimeout(() => {
        window.location.replace("/")
      }, 600)
    )
  }

  // Update user data
  async function updateUser() {
    const docRef = doc(db, "users", userId);

    return await updateDoc(docRef, {
      displayName: watch("displayName"),
      phone: watch("phoneNumber"),
      size: watch("vehicleSize"),
      isCovered: watch("covered"),
      additionalInfo: watch("additionalInfo"),
      imgUrl: imageUrl,
    })
    .then(
      setRefresh((current) => !current),
      console.log("Updated"),
      setTimeout(() => {
        window.location.replace("/")
      }, 600)
    )
  }

  // Get Data from current user
  
  useEffect(() => {
    async function getCurrentData() {
      const currentId = await IdsArray?.indexOf(userId)
      // console.log(users[currentId])
      setValue("displayName", users[currentId]?.displayName)
      setValue("phoneNumber", users[currentId]?.phone)
      setValue("vehicleSize", users[currentId]?.size)
      setValue("covered", users[currentId]?.isCovered)
      setValue("additionalInfo", users[currentId]?.additionalInfo)
    }
    getCurrentData();
  }, [firestoreLoading])

  return (
    <div className="management-container">
      <Header />
      { 
        firestoreLoading ?
        <span>Loading</span> :
        alreadyRegistered ?
        <div className="management-content">
          <h3>Dados do seu anúncio</h3>
          <input 
            type="text" 
            placeholder="nome..." 
            {...register("displayName")}
          />
          <input 
            type="text" 
            placeholder="telefone..." 
            {...register("phoneNumber")}
          />
          <input 
            type="text" 
            placeholder="tamanho do veículo..." 
            {...register("vehicleSize")}
          />
          <input 
            type="text" 
            placeholder="coberto..." 
            {...register("covered")}
          />
          <textarea 
            placeholder="informações adicionais..." 
            {...register("additionalInfo")}
          />

          <div className="image-input-wrapper">
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <button onClick={uploadFile}>upload</button>
          </div>
          <img src={imageUrl} alt="" />
          
          <button onClick={() => updateUser()}>Atualizar</button>
        </div> :
        <>
          <input 
            type="text" 
            placeholder="nome..." 
            {...register("displayName")}
          />
          <input 
            type="text" 
            placeholder="telefone..." 
            {...register("phoneNumber")}
          />
          <input 
            type="text" 
            placeholder="tamanho do veículo..." 
            {...register("vehicleSize")}
          />
          <input 
            type="text" 
            placeholder="coberto..." 
            {...register("covered")}
          />
          <input 
            type="text" 
            placeholder="informações adicionais..." 
            {...register("additionalInfo")}
          />

          <div className="image-input-wrapper">
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <button onClick={uploadFile}>upload</button>
          </div>
          <img src={imageUrl} alt="" />
          
          <button onClick={() => registerUser()}>Registrar</button>
        </>
      }
    </div>
  )
}