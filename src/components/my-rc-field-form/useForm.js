// 定义状态管理库

import { log } from "@craco/craco/lib/logger";
import { useRef } from "react";

class FormStore {
  constructor() {
    this.store = {};
    this.instances = [];
  }

  // 注册实例
  // 注册实例和取消实例要写在一起
  registerInstance = (instance) => {
    this.instances.push(instance);

    return () => {
      this.instances = this.instances.filter((item) => item !== instance);
      delete this.store[instance.props.name];
    };
  };

  // get
  getFildsValue = () => {
    return { ...this.store };
  };

  getFildValue = (name) => {
    return this.store[name];
  };

  // set
  setFildsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore,
    };
    console.log("this.store", this.store, this.instances);
    this.instances.forEach((item) => {
      // debugger;
      Object.keys(newStore).forEach((k) => {
        if (k === item.props.name) {
          item.forceUpdate();
        }
      });
    });
  };

  getForm = () => {
    return {
      getFildsValue: this.getFildsValue,
      getFildValue: this.getFildValue,
      setFildsValue: this.setFildsValue,
      registerInstance: this.registerInstance,
    };
  };
}

function useForm() {
  const formRef = useRef();

  if (!formRef.current) {
    const formStore = new FormStore();
    formRef.current = formStore.getForm();
  }

  return [formRef.current];
}

export default useForm;
