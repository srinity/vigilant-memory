import firebase from 'react-native-firebase'; 

export const handleNotificationsPermissions = async () => {
    try {
        const notificationsEnabled = firebase.messaging().hasPermission();

        if (!notificationsEnabled) {
            const userGrantedPermission = firebase.messaging().requestPermission();

            return userGrantedPermission;
        }

        return notificationsEnabled;
    } catch (error) {
        console.tron.error(error);
        return false;
    }
};

export const getNotificationsToken = async () => {
    try {
        const token = await firebase.messaging().getToken();
        return token;
    } catch (error) {
        alert('here');
        console.tron.error(error);
        return false;
    }
};

export const onNotificationsTokenChange = (callback = (newToken) => {}) => {
    return firebase.messaging().onTokenRefresh(callback);
};
