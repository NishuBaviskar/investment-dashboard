import { useState } from 'react'

const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })

        // Validate on change if the field has been touched
        if (touched[name]) {
            const validationErrors = validate(values)
            setErrors(validationErrors)
        }
    }

    const handleBlur = (e) => {
        const { name } = e.target
        setTouched({
            ...touched,
            [name]: true
        })

        // Validate on blur
        const validationErrors = validate(values)
        setErrors(validationErrors)
    }

    const handleSubmit = (onSubmit) => (e) => {
        e.preventDefault()

        // Mark all fields as touched
        const allTouched = {}
        Object.keys(values).forEach(key => {
            allTouched[key] = true
        })
        setTouched(allTouched)

        // Validate all fields
        const validationErrors = validate(values)
        setErrors(validationErrors)

        // Submit if no errors
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(values)
        }
    }

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setErrors,
        setTouched
    }
}

export default useForm;