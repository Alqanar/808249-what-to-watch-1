import React from "react";
import renderer from "react-test-renderer";

import GenresListItem from "./genres-list-item.jsx";


it(`Genres list item correctly renders`, () => {
  const tree = renderer
    .create(<GenresListItem
      name="Dramas"
      onGenreClick={() => {}}
      isActive={false}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
