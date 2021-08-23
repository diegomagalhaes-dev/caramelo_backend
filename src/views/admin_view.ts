import Admin from "../models/Admin";
import CollectPoint from "../models/CollectPoint";
import images_view from "./images_view";

export default {
  renderFeeder(collectpoint: CollectPoint) {
    return {
      id: collectpoint.id,
      latitude: collectpoint.latitude,
      longitude: collectpoint.longitude,
      image: images_view.render(collectpoint.image || ""),
    };
  },

  renderManyFeeders(collectpoints: CollectPoint[]) {
    return collectpoints.map((collectpoint) => this.renderFeeder(collectpoint));
  },
};
