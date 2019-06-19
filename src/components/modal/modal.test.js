import React from "react";
import {mount} from "enzyme";

import Modal from "./modal.tsx";


const Child = () => <div>Yolo</div>;

let component;

const root = global.document.createElement(`div`);
root.setAttribute(`id`, `root`);
const body = global.document.querySelector(`body`);
body.appendChild(root);

afterEach(() => {
  component.unmount();
});

it(`should render all the styled components and the children`, () => {
  component = mount(
    <Modal>
      <Child />
    </Modal>,
  );
});
