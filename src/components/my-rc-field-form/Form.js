import FormContext from "./FormContext";

export default function Form({ children, form }) {
  return (
    <form>
      <FormContext.Provider value={form}>{children}</FormContext.Provider>
    </form>
  );
}
