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

  onStoreChange = () => {
    this.forceUpdate();
  }

  getControlled = () => {
    const { getFieldValue, setFieldsValue } = this.context;
    const { name } = this.props;

    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        setFieldsValue({ [name]: newValue });
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
