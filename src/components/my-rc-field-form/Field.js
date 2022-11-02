import React, { Component } from "react";

class Field extends Component {
  state = {};

  getControlled = () => {
    return {
      value: "omg",
      onChange: (e) => {
        const newValue = e.target.value;
        console.log("newValue", newValue);
      },
    };
  };

  render() {
    const { children } = this.props;

    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode;
  }
}

export default Field;
