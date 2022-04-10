export default function useValidationRules() {
  function isRequired(message = 'Campo obrigatório!') {
    return (val) => !!val || message
  }

  function isValidEmail(message = 'Email inválido!') {
    const regexRule =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (val) => regexRule.test(val) || message
  }

  function minLength(length, message = 'Minímo de %% caracteres!') {
    return (val) => val.length >= length || message.replace('%%', length)
  }

  function maxLength(length, message = 'Máximo de && caracteres!') {
    return (val) => val.length <= length || message.replace('&&', length)
  }

  const rules = {
    isRequired,
    isValidEmail,
    minLength,
    maxLength
  }

  return {
    rules
  }
}
