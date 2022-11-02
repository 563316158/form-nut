import React, { Component } from "react";
import FormContext from "./FormContext";
class Field extends Component {
  static contextType = FormContext;
  state = {};

  componentDidMount() {
    console.log("this.context:", this.context);
    this.unregister = this.context.registerInstance(this);
  }

  componentWillUnmount() {
    this.unregister();
  }

  getControlled = () => {
    const { getFildValue, setFildsValue } = this.context;
    const { name } = this.props;

    return {
      value: getFildValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        setFildsValue({ [name]: newValue });
        // this.forceUpdate(); 写这里太暴力了
      },
    };
  };

  render() {
    console.log("Filed render");
    const { children } = this.props;

    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}

export default Field;
