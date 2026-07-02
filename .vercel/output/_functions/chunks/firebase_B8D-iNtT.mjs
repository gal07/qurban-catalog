import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
var app = getApps().length > 0 ? getApp() : initializeApp({
	apiKey: void 0,
	authDomain: void 0,
	projectId: void 0,
	storageBucket: void 0,
	messagingSenderId: void 0,
	appId: void 0,
	measurementId: void 0
});
var db = getFirestore(app);
getAuth(app);
//#endregion
export { db as t };
