import * as React from "react";
import * as ReactDOM from "react-dom";


const modalRoot = document.getElementById(`root`);

class Modal extends React.PureComponent<{}> {
  private modalContainer: HTMLElement ;
  public constructor(props) {
    super(props);

    this.modalContainer = document.createElement(`div`);
  }

  public componentDidMount(): void {
    modalRoot.appendChild(this.modalContainer);
  }

  public componentWillUnmount(): void {
    modalRoot.removeChild(this.modalContainer);
  }

  public render(): React.ReactElement {
    const {children} = this.props;

    return ReactDOM.createPortal(
      children,
      this.modalContainer
    );
  }
}

export default Modal;
