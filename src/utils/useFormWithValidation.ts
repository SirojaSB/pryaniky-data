import React, {useState, useCallback} from 'react'

type ValueInitType = {
    [key: string]: string
}

function useFormWithValidation(valueInit: ValueInitType, errorInit?: ValueInitType) {
    const [values, setValues] = useState({...valueInit})
    const [errors, setErrors] = useState({...errorInit})
    const [isValid, setIsValid] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target
        const { name, value } = target

        setValues(values => ({ ...values, [name]: value }))
        setErrors(errors => ({ ...errors, [name]: target.validationMessage }))

        const targetElement = e.target as Element
        const formElement = targetElement.closest('form')
        if (formElement) {
            setIsValid(formElement.checkValidity())
        }
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues)
            setErrors(newErrors)
            setIsValid(newIsValid)
        },
        [setValues, setErrors, setIsValid]
    );

    return {values, errors, isValid, handleChange, resetForm}
}

export default useFormWithValidation
