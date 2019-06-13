import React from "react";
import renderer from "react-test-renderer";

import ReviewsTabItem from "./reviews-tab-item.tsx";


const reviewsMockData = [
  {
    id: 1,
    user: {
      id: 4,
      name: `Kate Muir`,
    },
    rating: 8.9,
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `2019-05-08T14:13:56.569Z`
  },
  {
    id: 2,
    user: {
      id: 8,
      name: `Lika Forester`,
    },
    rating: 10,
    comment: `I laughed, cried and was speechless. 3 hours well used. It was a perfect. I will watch it again and again and again. 10 points well deserved!!!`,
    date: `2019-05-13T15:23:56.569Z`
  }
];

it(`item of the reviews tab correctly renders`, () => {
  const tree = renderer
    .create(
      <ReviewsTabItem
        review={reviewsMockData}
      />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
