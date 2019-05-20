import React, { Component } from 'react';
import { View, ViewPropTypes, TouchableOpacity, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { has as _has, isFunction as _isFunction } from 'lodash';

import styles from './CollapseExpandView.Styles';

class CollapseExpandView extends Component {
    static getDerivedStateFromProps(props, state) {
        const newState = {};

        if (props.isExpanded !== undefined && props.isExpanded !== state.isExpanded) {
            newState.isExpanded = props.isExpanded;
        }

        if (props.height !== undefined && props.height !== state.childHeight) {
            newState.childHeight = props.height;
        }

        return Object.keys(newState).length === 0 ? null : newState;
    }

    constructor(props) {
        super(props);

        this.state = {
            isExpanded: true,
            childHeight: props.height || null
        };

        this.initialized = false;
        this.isAnimating = false;

        this.collapseExpandAnimation = new Animated.Value(1);
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.isExpanded !== prevProps.isExpanded
            ||
            this.state.isExpanded !== prevState.isExpanded
        ) {
            const newIsExpanded = this.props.isExpanded !== prevProps.isExpanded ?
                this.props.isExpanded : this.state.isExpanded;

            this.collapseExpandChildView(newIsExpanded);

            this.isAnimating = true;
        }
    }

    onChildrenLayoutCalculator = ({ nativeEvent }) => {
        const { height, isExpanded: isExpandedProp } = this.props;
        const { layout } = nativeEvent;
        const { childHeight, isExpanded } = this.state;
        
        if (
            !height &&
            !this.isAnimating &&
            (layout.height !== 0 || (layout.height === 0 && childHeight === null)) &&
            childHeight !== layout.height
        ) {
            console.warn(JSON.stringify(layout, null, '\t'));
            const newIsExpanded = (this.initialized || isExpandedProp) ? isExpanded : false;

            this.setState({ childHeight: layout.height, isExpanded: newIsExpanded });
            this.collapseExpandAnimation.setValue(newIsExpanded ? 1 : 0);
            this.initialized = true;
        }
    }

    onTitlePress = () => {
        const { isExpanded } = this.state;
        const fromPropsUpdate = _has(this.props, 'isExpanded');
        const newIsExpanded = fromPropsUpdate ? isExpanded : !isExpanded;

        if (!fromPropsUpdate) {
            this.setState({ isExpanded: newIsExpanded });
        }

        if (_isFunction(this.props.onExpandCollapse)) {
            this.props.onExpandCollapse(newIsExpanded);
        }
    }

    collapseExpandChildView = (isExpanded) => {
        Animated.timing(this.collapseExpandAnimation, {
            toValue: isExpanded ? 1 : 0,
            duration: this.props.duration
        }).start(({ finished }) => {
            if (finished) {
                // just to make sure it is done and the onLayout wont be triggered to calculate wrong height
                setTimeout(() => {
                    this.isAnimating = false;
                }, 0);
            }
        });
    }

    renderTitle = (title, renderTitle, headerContainerStyle, clickOpacity, headerStyle, props) => {
        if (title) {
            return (
                <TouchableOpacity
                    style={[styles.headerContainerStyle, headerContainerStyle]}
                    onPress={this.onTitlePress}
                    activeOpacity={clickOpacity}
                    {...props}
                >
                    <Text style={[styles.headerStyle, headerStyle]}>{title}</Text>
                </TouchableOpacity>
            );
        } else if (_isFunction(renderTitle)) {
            return renderTitle(this.state.isExpanded);
        }

        return null;
    }

    render() {
        const { 
            clickOpacity,
            children,
            containerStyle,
            headerContainerStyle,
            headerStyle,
            style,
            title,
            renderTitle,
            ...props
        } = this.props;

        const childHeight = this.collapseExpandAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.state.childHeight]
        });

        const childAnimatedStyle = {
            height: this.state.childHeight === null ? undefined : childHeight
        };

        // console.tron.error(this.props);
        return (
            <View style={[styles.containerStyle, containerStyle]}>
                {
                    this.renderTitle(
                        title, renderTitle, headerContainerStyle, clickOpacity, headerStyle, props
                    )
                }
                <Animated.View
                    // We add the style the user passed first because we don't want to overwrite the animated styles
                    // or the overflow hidden style and padding 0 style (padding misses up the calculations).
                    // if the user wants padding give it to the children 
                    style={[style, styles.childContainerStyle, childAnimatedStyle]}
                    onLayout={this.onChildrenLayoutCalculator}
                >
                    {children}
                </Animated.View>
            </View>
        );
    }
}

CollapseExpandView.defaultProps = {
    duration: 350,
    containerStyle: {},
    headerContainerStyle: {},
    headerStyle: {},
    style: {},
    renderTitle: () => {}
};

CollapseExpandView.propTypes = {
    title: PropTypes.string,
    renderTitle: PropTypes.func,
    isExpanded: PropTypes.bool,
    duration: PropTypes.number,
    height: PropTypes.number,
    clickOpacity: PropTypes.number,
    onExpandCollapse: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    headerContainerStyle: ViewPropTypes.style,
    headerStyle: Text.propTypes.style,
    style: ViewPropTypes.style
};

export default CollapseExpandView;
