import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Modal from "./modal.tsx";


Enzyme.configure({adapter: new Adapter()});

const Child = () => <div>Yolo</div>;
const root = global.document.createElement(`div`);
root.setAttribute(`id`, `root`);
const body = global.document.querySelector(`body`);
body.appendChild(root);

it(`should render all the styled components and the children`, () => {
  const component = mount(
    <Modal>
      <Child />
    </Modal>,
  );
});
