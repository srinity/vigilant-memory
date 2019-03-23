import Reactotron, { asyncStorage, networking } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';


const reactotron = Reactotron
                    .configure({ name: 'ElCartona' })
                    .useReactNative()
                    .use(asyncStorage())
                    .use(networking())
                    .use(reactotronRedux())
                    .connect();


// Let's clear Reactotron on every time we load the app
Reactotron.clear();

// Totally hacky, but this allows you to not both importing reactotron-react-native
// on every file.  This is just DEV mode, so no big deal.
console.tron = Reactotron;

export default reactotron;
