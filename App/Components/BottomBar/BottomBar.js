import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import { Actions } from 'react-native-router-flux';

import { Icon } from './..';

import { Colors } from '../../Theme';

import styles from './BottomBar.Styles';

class BottomBar extends Component {
    state = {
        isVisible: Actions.currentScene === 'home',
        activeTab: 'home'
    }

    onTabPress = (tab) => {
        const { activeTab } = this.state;

        if (tab.key === activeTab) {
            return;
        }

        let action = () => {};

        if (tab.key === 'home') {
            action = Actions.popTo(this, tab.key);
        } else if (activeTab !== 'home') {
            action = Actions.replace.bind(this, tab.key);
        } else {
            action = Actions[tab.key];
        }

        this.setActiveTab(tab.key);
        action();
    }

    setActiveTab = (tabKey) => {
        this.setState({ activeTab: tabKey });
    }

    setBottomBarVisibility = (visible = false) => {
        if (visible !== this.state.isVisible) {
            this.setState({ isVisible: visible });
        }
    }

    renderIcon = tab => ({ isActive }) => (
        <Icon
            type={tab.type}
            size={24}
            color={isActive ? Colors.brandColorHexCode : Colors.blackColorHexCode}
            name={tab.icon}
        />
    )

    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            labelStyle={{ color: isActive ? Colors.brandColorHexCode : Colors.blackColorHexCode }}
            renderIcon={this.renderIcon(tab)}
        />
    )

    render() {
        return this.state.isVisible ? (
            <BottomNavigation
                activeTab={this.state.activeTab}
                onTabPress={this.onTabPress}
                renderTab={this.renderTab}
                tabs={this.props.tabs}
            />
        ) : null;
    }
}

BottomBar.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default BottomBar;
