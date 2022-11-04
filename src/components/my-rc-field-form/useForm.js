// 定义状态管理库

import { log } from "@craco/craco/lib/logger";
import { useRef } from "react";

class FormStore {
  constructor() {
    this.store = {};
    this.instances = [];

    this.callbacks = {};
  }

  setCallbacks = (callbacks) => {
    this.callbacks = { ...this.callbacks, ...callbacks };
  };

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
  getFieldsValue = () => {
    return { ...this.store };
  };

  getFieldValue = (name) => {
    return this.store[name];
  };

  // set
  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore,
    };
    console.log("this.store", this.store, this.instances);
    this.instances.forEach((item) => {
      // debugger;
      Object.keys(newStore).forEach((k) => {
        if (k === item.props.name) {
          item.onStoreChange();
        }
      });
    });
  };

  // 效验
  validate = () => {
    let err = [];

    this.instances.forEach((instance) => {
      const { name, rules } = instance.props;
      const value = this.getFieldValue(name);
      let rule = rules[0];
      if (rule && rule.required && (value === undefined || value === "")) {
        err.push({ [name]: rule.message });
      }
    });
    return err;
  };

  submit = () => {
    console.log("submit");

    const err = this.validate();

    const { onFinish, onFinishFailed } = this.callbacks;

    const values = this.getFieldsValue();

    if (err.length === 0) {
      // 效验成功
      onFinish(values);
    } else {
      onFinishFailed(err, values);
    }
  };

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerInstance: this.registerInstance,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
    };
  };
}

function useForm(form) {
  const formRef = useRef();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}

export default useForm;
