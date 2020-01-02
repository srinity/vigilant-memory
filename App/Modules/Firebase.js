import firebase from 'react-native-firebase'; 

export const handleNotificationsPermissions = async () => {
    try {
        // check if the required permissions are given
        const notificationsEnabled = firebase.messaging().hasPermission();

        if (!notificationsEnabled) {
            // if not given request the permissions
            const userGrantedPermission = firebase.messaging().requestPermission();

            return userGrantedPermission;
        }

        return notificationsEnabled;
    } catch (error) {
        // console.tron.error(error);
        return false;
    }
};

export const getNotificationsToken = async () => {
    try {
        // retrieve the firebase user token
        const token = await firebase.messaging().getToken();
        return token;
    } catch (error) {
        alert('here');
        // console.tron.error(error);
        return false;
    }
};

// on notification token change call the given callback
export const onNotificationsTokenChange = (callback = (newToken) => {}) => {
    return firebase.messaging().onTokenRefresh(callback);
};
