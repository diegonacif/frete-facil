import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../../contexts/AuthGoogleProvider";
import { db } from '../../services/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';

export const Management = () => {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState({})
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const { userId } = useContext(AuthGoogleContext);
  const [refresh, setRefresh] = useState(false);

  const IdsArray = firestoreLoading ? [] : users?.map((user) => user.id)

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

  // console.log({
  //   "registered": alreadyRegistered,
  //   "loading": firestoreLoading,
  //   "id": userId
  // });

  // Create user data
  async function registerUser() {
    const docRef = doc(db, "users", userId);

    return await setDoc(docRef, {
      displayName: watch("displayName"),
      phone: watch("phoneNumber"),
      size: watch("vehicleSize"),
      isCovered: watch("covered"),
    })
    .then(
      setRefresh((current) => !current),
      console.log("Registered")
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
    }
    getCurrentData();
  }, [firestoreLoading])

  // console.log({
  //   "users": users,
  //   "ids": IdsArray
  // });

  return (
    <div className="management-container">
      <h1>Management</h1>
      { 
        firestoreLoading ?
        <span>Loading</span> :
        alreadyRegistered ?
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
            placeholder="tipo de veículo..." 
            {...register("vehicleSize")}
          />
          <input 
            type="text" 
            placeholder="coberto..." 
            {...register("covered")}
          />
          
          <button onClick={() => updateUser()}>Atualizar</button>
        </> :
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
            placeholder="tipo de veículo..." 
            {...register("vehicleSize")}
          />
          <input 
            type="text" 
            placeholder="coberto..." 
            {...register("covered")}
          />
          
          <button onClick={() => registerUser()}>Registrar</button>
        </>
      }
    </div>
  )
}