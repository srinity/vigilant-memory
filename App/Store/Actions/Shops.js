import { APIURLs, AppAxios } from './../../Config/APIConfig';

import {
    GET_SHOPS_REQUEST_STARTED,
    GET_SHOPS_REQUEST_FAILED,
    GET_SHOPS_REQUEST_SUCCESS
} from './ActionTypes';

import { Images } from './../../Theme';

const dummyShops = [
    {
      shopName: 'Some Shop Name',
      shopImage: Images.cover,
      address: 'Some Shop Adress, more address, address!!'
    },
    {
      shopName: 'Another Shop!',
      shopImage: 'https://picsum.photos/200/300/?random',
      address: 'This is the other shop Address!ß'
    },
    {
      shopName: 'Some Other Shop Name',
      shopImage: 'https://picsum.photos/200/300/?random',
      address: 'Some Shop Adress, more address, address!!'
    },
    {
      shopName: 'Fat7 Allah',
      shopImage: 'https://picsum.photos/200/300/?random',
      address: 'Some Shop Adress, more address, address!!'
    },
    {
      shopName: 'Mdenah',
      shopImage: 'https://picsum.photos/200/300/?random',
      address: 'Some Shop Adress, more address, address!!'
    },
    {
      shopName: 'Some Shop Name',
      shopImage: 'https://picsum.photos/600/600/?random',
      address: 'Some Shop Adress, more address, address!!'
    }
];

export const getShops = () => {
    return async (dispatch) => {
        dispatch(getShopsStarted());
        setTimeout(() => {
            dispatch(getShopsSuccess(dummyShops));
        }, 500);
    };
};

function getShopsStarted() {
    return { type: GET_SHOPS_REQUEST_STARTED };
}

function getShopsSuccess(shops) {
    return { type: GET_SHOPS_REQUEST_SUCCESS, shops };
}

function getShopsFailed(error) {
    return { type: GET_SHOPS_REQUEST_FAILED, error };
}
