import { useRouter } from "next/navigation";
import { useState } from "react"
import Validation from "./validation";
import toast from "react-hot-toast";
import { useApi } from "@/custom-hooks/useApi";
import { STATUSCODE } from "@/helper/constants";

const LoginController = () => {
    const api = useApi()
    const router = useRouter()
    const [loader, setLoader] =  useState(false);
    const initialFromValues = {
        email:'',
        password:''
    }
    const [formValues, setFormValues] =  useState(initialFromValues);
    const [errors, setErrors] = useState('')
    // Handle Change
    const handleChange = (value: any, name: string) => {
        setFormValues((previousFormValue)=>({
            ...previousFormValue,
            [name]: value.trim()
        }))
        if(Object.keys(errors).length >0){
            setErrors((preValue: any)=>({
                ...preValue,
                [name]:''
            }))
        }

    }
    // End
    // Hamdle Submit
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const error = Validation(formValues)
        if(Object.keys(error).length > 0){
            setErrors(error)
        }else{
            login(formValues)
        }
    }
    // End
    // Api Call
    const login = async(formValues: any) => {
        setLoader(true)
        try {
            const res = await api.post('login', formValues);
            const resData = res.data
            if(resData.status === STATUSCODE.HTTPOK){
                toast.success(resData.message)
                router.push('/admin/dashboard')
            }else if(resData.status === STATUSCODE.HTTPNOTFOUND){
                toast.error(resData.error)
            }else if(resData.status === STATUSCODE.HTTPINTERNALSERVERERROR){
                toast.error(resData.error)
            }else if(resData.status === STATUSCODE.HTTPVALIDATE){
                resData.errors&& resData.errors.length>0 && resData.errors.map((error: any)=> toast.error(error))
            }else{
                toast.error(resData.error)
            }
            
        } catch (error: any) {
            toast.error(error.message)
        }finally{
            setLoader(false)
        }
    }
    // End

  return {handleChange, handleSubmit, formValues, errors, loader}
}

export default LoginController
