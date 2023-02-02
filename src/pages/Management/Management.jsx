import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../../contexts/AuthGoogleProvider";
import { db } from '../../services/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export const Management = () => {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState({})
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const { userId } = useContext(AuthGoogleContext);

  const IdsArray = firestoreLoading ? [] : users?.map((user) => user.id)
  
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
  }, [])

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

  console.log({
    "registered": alreadyRegistered,
    "loading": firestoreLoading,
    "id": userId
  });

  // console.log(users);

  return (
    <div className="management-container">
      <h1>Management</h1>
    </div>
  )
}