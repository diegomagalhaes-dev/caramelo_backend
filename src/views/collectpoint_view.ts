import CollectPoint from "../models/CollectPoint";
import images_view from "./images_view";

export default {
  render(collectpoint: CollectPoint) {
    return {
      id: collectpoint.id,
      latitude: collectpoint.latitude,
      longitude: collectpoint.longitude,
      image: images_view.render(collectpoint.image || ""),
    };
  },

  renderMany(collectpoints: CollectPoint[]) {
    return collectpoints.map((collectpoint) => this.render(collectpoint));
  },
};
