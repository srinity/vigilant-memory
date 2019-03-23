import React, { Component } from 'react';
import { Dimensions } from 'react-native';


const PORTRAIT = 'PORTRAIT';
const LANDSCAPE = 'LANDSCAPE';
const DEVICE_TYPES = {
    MOBILE: 'MOBILE',
    TABLET: 'TABLET'
};

class DeviceDimensions extends Component {
    constructor(props) {
        super(props);

        const { width, height } = Dimensions.get('window');
        const diagonalInches = this._getScreenDiagonalInches(width, height);

        this.state = {
            width,
            height,
            diagonalInches,
            orientation: this._getOrientation(width, height),
            deviceType: this._deviceType(diagonalInches)
        };
    }

    componentWillMount() {
        if (typeof this.props.onDimensionsChanged === 'function') {
            this.props.onDimensionsChanged(this.state);
        }

        Dimensions.addEventListener('change', this._dimensionsChanged);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this._dimensionsChanged);
    }

    _getOrientation = (width, height) => {
        return height > width ? PORTRAIT : LANDSCAPE;
    }

    _dimensionsChanged = (dimensions) => {
        const { width, height } = dimensions.window;

        const newDimensions = {
            width,
            height,
            orientation: this._getOrientation(width, height),
        };

        if (this._hadDimensionsChanged(newDimensions)) {
            this.setState(newDimensions);

            if (typeof this.props.onDimensionsChanged === 'function') {
                this.props.onDimensionsChanged(this.state);
            }
        }
    }

    _hadDimensionsChanged = (newDimensions) => {
        return newDimensions.width !== this.state.width || newDimensions.height !== this.state.height;
    }

    _dpToInches = (dp) => {
        const inches = dp / 160;
        return inches;
    }

    _getScreenDiagonalInches = (width, height) => {
        const widthSquare = width * width;
        const heightSquare = height * height;

        const screenDiagonalDP = Math.sqrt(widthSquare + heightSquare);

        const screenDiagonalInches = this._dpToInches(screenDiagonalDP);

        return screenDiagonalInches;
    }

    _deviceType = (screenDiagonalInches) => {
        if (screenDiagonalInches >= 7) {
            return DEVICE_TYPES.TABLET;
        }
            
        return DEVICE_TYPES.MOBILE;
    }
    
    render() {
        return null;
    }
}

export default DeviceDimensions;
