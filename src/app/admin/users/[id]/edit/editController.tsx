import { useRouter } from "next/navigation"
import { useState } from "react"

const EditController = () => {
    const router = useRouter()
    const initialFormData = {
        name:'',
        email:'',
        mobile: '',
        password:'',
        confirmPassword: '',
        status:1
    }
    const initialFormValue = {
        formData: initialFormData,
        loader: false,
        errors: ''
    }
    const [formValues, setFormValues] = useState(initialFormValue);
    // handle change
    const handleChange = (value:any, name:any) => {
        setFormValues((previousFormValue)=>({
            ...previousFormValue,
            formData:{
                ...previousFormValue.formData,
                [name]: value.trim()
            }
        }))

    }
    // handle submit 
    const handleSubmit = (e: any) => {
        e.preventDefalut();
        router.push('/')

    }
  return {
    handleChange,
    handleSubmit,
    formValues
  }
}

export default EditController