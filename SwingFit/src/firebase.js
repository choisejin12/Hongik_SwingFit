import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, updateDoc ,getDoc ,getDocs,onSnapshot,query,orderBy} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import config from '../firebase.json';
import storage from '@react-native-firebase/storage';

export const app = initializeApp(config);

const auth = getAuth(app);

export const signin = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

const uploadImage = async uri => {
  if (uri.startsWith('https')) {
    return uri;
  }

  const response = await fetch(uri);
  const blob = await response.blob();

  const { uid } = auth.currentUser;
  const storage = getStorage(app);
  const storageRef = ref(storage, `/profile/${uid}/photo.png`);
  await uploadBytes(storageRef, blob, {
    contentType: 'image/png',
  });

  return await getDownloadURL(storageRef);
};

const uploadPostureImage = async uri => {
  if (uri.startsWith('https')) {
    return uri;
  }

  const response = await fetch(uri);
  const blob = await response.blob();

  const { uid } = auth.currentUser;
  const storage = getStorage(app);
  const storageRef = ref(storage, `/Posture/${uid}/photo.png`);
  await uploadBytes(storageRef, blob, {
    contentType: 'image/png',
  });

  return await getDownloadURL(storageRef);
};

const uploadBoardImage = async uri => {
  if (uri.startsWith('https')) {
    return uri;
  }

  const response = await fetch(uri);
  const blob = await response.blob();
  
  const { uid } = auth.currentUser;
  const storage = getStorage(app);
  const storageRef = ref(storage, `/Board/${uid}/photo.png`);
  
  await uploadBytes(storageRef, blob, {
    contentType: 'image/png',
  });
  
  return await getDownloadURL(storageRef);
};



export const signup = async ({ name, email, password, photo }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const photoURL = await uploadImage(photo);
  await updateProfile(auth.currentUser, { displayName: name, photoURL });
  return user;
};

export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL,information} = auth.currentUser;
  return { uid, name: displayName, email, photo: photoURL , information};
};

export const updateUserInfo = async photo => {
  const photoURL = await uploadImage(photo);
  await updateProfile(auth.currentUser, { photoURL });
  return photoURL;
};

export const updateUserPosture = async photo => {
  const photoURL = await uploadPostureImage(photo);
  //await updateProfile(auth.currentUser, { photoURL });
  return photoURL;
};

export const createUserBoardImg = async photo => {
  const photoURL = await uploadBoardImage(photo);
  //await updateProfile(auth.currentUser, { photoURL });
  return photoURL;
};


export const signout = async () => {
  await signOut(auth);
  return {};
};

const db = getFirestore(app);

export const createChannel = async ({ title, desc }) => {
  const channelCollection = collection(db, 'channels');
  const newChannelRef = doc(channelCollection);
  const id = newChannelRef.id;
  const newChannel = {
    id,
    title,
    description: desc,
    createdAt: Date.now(),
  };
  await setDoc(newChannelRef, newChannel);
  return id;
};

export const createMessage = async ({ channelId, message }) => {
  const docRef = doc(db, `channels/${channelId}/messages`, message._id);
  await setDoc(docRef, { ...message, createdAt: Date.now() });
};

export const createInformation = async ({information}) => {
  const informationCollection = collection(db, 'Information');
  const newInformationRef = doc(informationCollection);
  const { uid } = auth.currentUser;
  const id = newInformationRef.id;
  const creatorId = uid;
  const newInformation = {
    id,
    creatorId,
    information,
  };
  return await setDoc(newInformationRef,newInformation);
  
};


export const updateInformation = async (newinformation) => {
  const {uid} = auth.currentUser
  const id = uid;
  const querySnapshot = await getDocs(collection(db, "Information"));
    querySnapshot.forEach((docs) => {
      if(docs.data().creatorId == id){
        const InformationRef = doc(db, "Information", docs.id );
        updateDoc (InformationRef, {
          information : newinformation,
        });
      };
  }); 

};



export const createBoard = async ({title,Desc,category,photo}) => {
  const BoardCollection = collection(db, 'Board');
  const newBoardRef = doc(BoardCollection);
  const { uid } = auth.currentUser;
  const CreatorId = uid;
  const id = newBoardRef.id;
  const newBoard = {
    CreatorId,
    Title:title,
    Desc,
    Category:category,
    CreatedAt: Date.now(),
    id,
    photo,
  };
  return await setDoc(newBoardRef,newBoard);
  
};

export const createComent= async ({ coment,doc_id}) => {
  try {
    const commentRef = doc(collection(db, 'Board', doc_id, 'Comments'));
    const { uid } = auth.currentUser;
    const {displayName} = auth.currentUser;
    const CreatorId = uid;
    const newComent = {
      CreatorId,
      coment,
      CreatedAt: Date.now(),
      _id:doc_id,
      name:displayName,
    };
    await setDoc(commentRef, newComent);
  } catch (error) {
    console.log(error);
  }
};


export const getImg = async (userid) => {
  try{
    const storage = getStorage(app);
    const storageRef = ref(storage, `/profile/${userid}/photo.png`);
    const protocol = storage._protocol+"://";
    const host = storage._host+"/v0/b/";
    const bucket = storageRef._location.bucket+"/o/";
    const path = storageRef._location.path_+"?alt=media";
    const newpath = path.replaceAll('/','%2F');
    
    const photoURL = protocol+host+bucket+newpath;
    return photoURL;

  }catch(e){
    console.log(e);
  }
}



export const getPostureImg =  async () => {
    try {
      const { uid } = auth.currentUser;
      const storage = getStorage(app);
      const storageRef = ref(storage, `/Posture/${uid}/photo.png`);
      const url = await getDownloadURL(storageRef);     
      return url;
    } catch (e) {
      console.log(e);
    }
  };



