import * as React from "react";
import * as ReactDOM from "react-dom";


class Modal extends React.PureComponent<{}> {
  private modalContainer: HTMLElement;
  private modalRoot: HTMLElement;

  public constructor(props) {
    super(props);

    this.modalRoot = document.getElementById(`root`);
    this.modalContainer = document.createElement(`div`);
  }

  public render(): React.ReactElement {
    const {children} = this.props;

    return ReactDOM.createPortal(
      children,
      this.modalContainer
    );
  }

  public componentDidMount(): void {
    this.modalRoot.appendChild(this.modalContainer);
  }

  public componentWillUnmount(): void {
    this.modalRoot.removeChild(this.modalContainer);
  }
}

export default Modal;
