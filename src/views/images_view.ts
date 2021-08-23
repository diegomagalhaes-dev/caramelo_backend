import Image from "../models/Image";

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `http://192.168.1.10:3333/uploads/${image.path}`,
    };
  },
};
