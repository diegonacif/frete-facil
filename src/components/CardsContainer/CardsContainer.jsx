import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../services/firebase";
import { Card } from "../Card/Card"

export const CardsContainer = () => {
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState({});
  const [firestoreLoading, setFirestoreLoading] = useState(true);

  // Users Data
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers();
  }, [])

   // Firestore loading
  const [value, loading, error] = useCollection(usersCollectionRef,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  useEffect(() => {
    setFirestoreLoading(loading);
  }, [loading])

  return (
    <div className="cards-container-container">
      { 
        firestoreLoading ?
        null :
        users?.map((user) => {
          return (
            <Card
              key={user.id}
              id={user.id}
              displayName={user.displayName}
              phone={user.phone}
              category={user.size}
              covered={user.isCovered}
              location={user.location}
              imgUrl={user.imgUrl}
              additionalInfo={user.additionalInfo}
              profileImgUrl={user.profileImgUrl}
            />
          )
        })
      }
    </div>
  )
}