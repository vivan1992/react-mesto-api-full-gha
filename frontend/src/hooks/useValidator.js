import { useState } from "react";

export function useValidator(initial = false) {
  const [validity, setValidity] = useState(initial);
  const [textError, setTextError] = useState('');

  const updateValidity = (e) => {
    setValidity(e.target.validity.valid);
    setTextError(e.target.validationMessage);
  }

  const resetValidation = () => {
    setValidity(initial);
    setTextError('');
  }

  return {validity, setValidity, textError, updateValidity, resetValidation}
}
