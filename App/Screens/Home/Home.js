import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

import { Images } from './../../Theme';

class Home extends Component {
    render() {
        console.tron.error(this.props);

        return (
            <ImageBackground source={Images.cover} style={{ flex: 1 }} />
        );
    }
}

export default Home;
