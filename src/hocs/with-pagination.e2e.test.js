import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withPagination from "./with-pagination.tsx";


Enzyme.configure({adapter: new Adapter()});

const MockComponent = ({
  onMoreButtonClick,
  onResetCurrentLength
}) => (
  <div>
    <button className="button-showmore" onClick={onMoreButtonClick} />
    <button className="button-showmore-reset" onClick={onResetCurrentLength} />
  </div>
);

MockComponent.propTypes = {
  onMoreButtonClick: PropTypes.func.isRequired,
  onResetCurrentLength: PropTypes.func.isRequired
};

const MockComponentWrapped = withPagination(MockComponent);

describe(`withPagination works correctly`, () => {
  it(`clicking on the button Show More change state currentLength`, () => {
    const wrapper = mount(<MockComponentWrapped
      useAllFilms
      onClick={() => {}}
    />);

    const buttonShowMore = wrapper.find(`.button-showmore`);

    buttonShowMore.simulate(`click`, {preventDefault() {}});

    expect(wrapper.state().currentLength).toEqual(40);
  });

  it(`clicking on the button reset change state currentLength`, () => {
    const wrapper = mount(<MockComponentWrapped
      useAllFilms
      onClick={() => {}}
    />);

    const buttonReset = wrapper.find(`.button-showmore-reset`);

    buttonReset.simulate(`click`, {preventDefault() {}});

    expect(wrapper.state().currentLength).toEqual(20);
  });
});
