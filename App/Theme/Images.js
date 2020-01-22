import { Image } from 'react-native';

const Images = {
  cover: Image.resolveAssetSource(require('./../Assets/Images/marketing-to-attract-grocery-stores__large.jpg')),
  cover2: Image.resolveAssetSource(require('./../Assets/Images/bpxmthgy.png')),
  logo: Image.resolveAssetSource(require('./../Assets/Images/KARTONA-02.png')),
  demoImage: Image.resolveAssetSource(require('./../Assets/Images/images.png')),
};

export default Images;

export const imageNames = Object.keys(Images);
