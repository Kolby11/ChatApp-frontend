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
    passwordConfirm: string
  }
  const { register, handleSubmit } = useForm<RegisterValues>()

  const onSubmit: SubmitHandler<RegisterValues> = async data => {
    try {
      const response = await AuthApi.register(data)
    }
    catch (err) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data.message.fieldErrors)
      }
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center px-16 py-20 text-primary-content">
      <div className='bg-primary px-10 py-4 rounded-lg flex justify-center items-center flex-col'>

        <h1 className="text mb-6 mt-6 text-3xl font-bold">Register</h1>
        <form className="flex w-72 flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username" className='label'>Username</label>
          <FormInput inputProps={register('username')} type="text" />
          <label htmlFor="email" className='label'>Email</label>
          <FormInput inputProps={register('email')} type="email" />
          <label htmlFor="password" className='label'>Password</label>
          <FormInput inputProps={register('password')} type="password" />
          <label htmlFor="passwordConfirm" className='label'>Confirm Password</label>
          <FormInput inputProps={register('passwordConfirm')} type="password" />
          <input
            type="submit"
            className="btn mt-10"
            value={'Register'}
          />
        </form>
        <p className='mt-5'>Already have an account? <Link to={"/login"} className=' link'>Login</Link></p>
      </div>
    </div>
  )
}
