import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Modal from "./modal.tsx";


Enzyme.configure({adapter: new Adapter()});

ReactDOM.createPortal = (node) => node;

const Child = () => <div className="kek">Yolo</div>;
const root = global.document.createElement(`div`);
root.setAttribute(`id`, `root`);
const body = global.document.querySelector(`body`);
body.appendChild(root);

it(`should render all the styled components and the children`, () => {
  const tree = renderer.create(
    <Modal>
      <Child />
    </Modal>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
