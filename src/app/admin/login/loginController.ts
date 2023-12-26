import { useRouter } from "next/navigation";
import { useState } from "react"

const LoginController = () => {
    const router = useRouter()
    const [loader, setLoader] =  useState(false);
    const initialFromValues = {
        email:'',
        password:''
    }
    const [formValues, setFormValues] =  useState(initialFromValues);
    const [errors, setErrors] = useState('')
    // Handle Change
    const handleChange = (value: any, name:string) => {
        setFormValues((previousFormValue)=>({
            ...previousFormValue,
            [name]: value.trim()
        }))

    }
    // End
    // Hamdle Submit
    const handleSubmit = (e:any) => {
        e.preventDefault();
        router.push('/admin/dashboard')

    }
    // End

  return {handleChange, handleSubmit, formValues, errors, loader}
}

export default LoginController
