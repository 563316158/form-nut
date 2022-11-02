// 定义状态管理库

import { useRef } from "react";

class FormStore {
  constructor() {
    this.store = {};
  }
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

    console.log("this.store", this.store);
  };

  getForm = () => {
    return {
      getFildsValue: this.getFildsValue,
      getFildValue: this.getFildValue,
      setFildsValue: this.setFildsValue,
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
