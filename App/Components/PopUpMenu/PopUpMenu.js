import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ViewPropTypes, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';

import { CollapseExpandView } from './../';

import styles from './PopUpMenu.Styles';

class PopUpMenu extends Component {
    constructor(props) {
        super(props);

        const { height, width } = Dimensions.get('window');

        this.state = {
            showMenu: false,
            width,
            height
        };
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.onDimensionChange);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.onDimensionChange);
    }

    onDimensionChange = (newDimensions) => {
        const { width, height } = newDimensions.window;

        this.setState({ height, width });
    }

    onLayout = (event) => {
        console.tron.error(event);
    }

    render() {
        const { width: screenWidth, height: screenHeight, showMenu } = this.state;

        return (
            <React.Fragment>
                {
                    showMenu 
                    ?
                    <TouchableOpacity
                        style={{
                            width: screenWidth,
                            height: screenHeight,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            left: 0,
                            zIndex: 50
                        }}
                        onPress={() => this.setState({ showMenu: false })}
                        
                    />
                    : null
                }
                {/* <View style={{ zIndex: 100 }} onLayout={this.onLayout}> */}
                    <CollapseExpandView
                        title='Header'
                        containerStyle={{ flex: 0, zIndex: 100, backgroundColor: 'transparent' }}
                        style={{ position: 'absolute' }}
                        isExpanded={showMenu}
                        onExpandCollapse={() => this.setState({ showMenu: !showMenu })}
                    >
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
                            <TouchableOpacity
                                style={{
                                        paddingVertical: 50,
                                        paddingHorizontal: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 5,
                                        backgroundColor: 'red'
                                    }}
                                    onPress={() => alert('here')}
                            >
                                <Text>Test 1</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={{
                                        paddingVertical: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: 5
                                    }}
                            >
                                <Text>Test 1</Text>
                            </TouchableOpacity>
                        </View>
                    </CollapseExpandView>
                {/* </View> */}
            </React.Fragment>
        );
    }
}

PopUpMenu.defaultProps = {};

PopUpMenu.propTypes = {};

export default PopUpMenu;
