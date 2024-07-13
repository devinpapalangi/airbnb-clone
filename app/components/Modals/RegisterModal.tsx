"use client"

import React from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, Message, SubmitHandler, useForm } from 'react-hook-form'

import Modal from './Modal'
import Heading from '../Heading'
import Input from '../Inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import useRegisterModal from '../../hooks/useRegisterModal'

interface RegisterFormFields{
    name: string
    email: string
    password: string
}

const RegisterModal = () => {
    const router = useRouter()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const defaultValues: RegisterFormFields = {
        name: '',
        email: '',
        password: ''
    }

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<RegisterFormFields>({
        defaultValues: defaultValues 
    })

    const onSubmit: SubmitHandler<RegisterFormFields> = async(data: RegisterFormFields) => {
        setIsLoading(true)

        try {
            await axios.post('/api/register', data)
            router.refresh()
            registerModal.onClose()
        } catch (error) {
            toast.error('Something went wrong!')
        }finally{
            setIsLoading(false)
        }
        
            
    }

    const bodyContent = (
        <div
        className='
        flex
        flex-col
        gap-4'>
            <Heading 
            title={'Welcome to Airbnb'}
            subtitle={'Create an account!'}
             />
            <Input<RegisterFormFields> 
                id="email" 
                label="Email" 
                type="email" 
                disabled={isLoading} 
                formatPrice={false}  
                required register={register} 
                errors={errors}/>
            <Input<RegisterFormFields> 
                id="name" 
                label="Name" 
                type="text" 
                disabled={isLoading} 
                formatPrice={false}  
                required register={register} 
                errors={errors}/>
            <Input<RegisterFormFields> 
                id="password" 
                label="Password" 
                type="password" 
                disabled={isLoading} 
                formatPrice={false}  
                required register={register} 
                errors={errors}/>
        </div>
    )

    const footerContent = (
        <div
        className='
        flex
        flex-col
        gap-4
        mt-3'>
            <hr />
            <Button
            outline
            label='Continue with Google'
            icon={FcGoogle}
            onClick={() => {}}/>
            <Button
            outline
            label='Continue with Github'
            icon={AiFillGithub}
            onClick={() => {}}/>
            <div
            className='
            text-neutral-500
            text-center
            mt-4
            font-light'>
                <div
                className='
                flex
                flex-row
                items-center
                justify-center
                gap-2'>
                    <div>
                    Already have an account?
                    </div>
                    <div 
                    onClick={registerModal.onClose}
                    className='
                    text-neutral-800
                    cursor-pointer
                    hover:underline
                    '>
                    Login
                    </div>
                </div>

            </div>
        </div>
    )
  return (
    <Modal 
        disabled={isLoading} 
        isOpen={registerModal.isOpen} 
        onClose={registerModal.onClose} 
        title="Register" 
        onSubmit={handleSubmit(onSubmit)}
        actionLabel="Continue" 
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal