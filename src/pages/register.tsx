import { FormInput } from '@/components/ui/FormInput'
import { AuthApi } from '@/lib/api/authApi'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export function Register() {
  type RegisterValues = {
    username: string
    email: string
    password: string
    confirmPassword: string
  }
  const { register, handleSubmit } = useForm<RegisterValues>()

  const onSubmit: SubmitHandler<RegisterValues> = async data => {
    try {
      const response = await AuthApi.register(data)
      console.log(response)
    }
    catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message.fieldErrors)
      }
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border border-gray-700 bg-slate-900 bg-opacity-80  px-16 py-20">
      <h1 className="text mb-10 text-3xl font-bold">Register</h1>
      <form className="flex w-72 flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className='label'>Username</label>
        <FormInput inputProps={register('username')} type="text" />
        <label htmlFor="email" className='label'>Email</label>
        <FormInput inputProps={register('email')} type="email" />
        <label htmlFor="password" className='label'>Password</label>
        <FormInput inputProps={register('password')} type="password" />
        <label htmlFor="confirmPassword" className='label'>Confirm Password</label>
        <FormInput inputProps={register('confirmPassword')} type="password" />
        <input
          type="submit"
          className="btn mt-10"
          value={'Register'}
        />
      </form>
      <p className='mt-5'>Already have an account? <Link to={"/login"} className=' link'>Login</Link></p>
    </div>
  )
}
