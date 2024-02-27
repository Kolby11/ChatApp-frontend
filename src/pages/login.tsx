import { FormInput } from '@/components/ui/FormInput'
import { AuthApi } from '@/lib/api/authApi'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export function Login() {
  type LoginValues = {
    usernameOrEmail: string
    password: string
  }

  const { register, handleSubmit } = useForm<LoginValues>()
  const onSubmit: SubmitHandler<LoginValues> = async data => {
    try {
      const response = await AuthApi.login(data)
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
      <h1 className="text mb-10 text-3xl font-bold">Login</h1>
      <form className="flex w-72 flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="usernameOrEmail" className='label'>Username</label>
        <FormInput inputProps={register('usernameOrEmail')} type="text" />
        <label htmlFor="password" className='label'>Password</label>
        <FormInput inputProps={register('password')} type="password" />
        <input
          type="submit"
          className="btn mt-10"
          value={'Login'}
        />

      </form>
      <p className='mt-5'>Don't have an account? <Link to={"/register"} className='link'>Register</Link></p>
    </div>
  )
}
