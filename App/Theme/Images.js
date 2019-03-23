import { Image } from 'react-native';

const Images = {
    cover: Image.resolveAssetSource(require('./../Assets/Images/marketing-to-attract-grocery-stores__large.jpg'))
};

export default Images;

export const imageNames = Object.keys(Images);

