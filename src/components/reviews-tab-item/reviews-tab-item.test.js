import React from "react";
import renderer from "react-test-renderer";

import ReviewsTabItem from "./reviews-tab-item.tsx";


const reviewMockData = {
  id: 1,
  user: {
    id: 4,
    name: `Kate Muir`,
  },
  rating: 8.9,
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  date: `2019-05-08T14:13:56.569Z`
};

it(`item of the reviews tab correctly renders`, () => {
  const tree = renderer
    .create(
      <ReviewsTabItem
        review={reviewMockData}
      />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
