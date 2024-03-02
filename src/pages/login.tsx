import { FormInput } from '@/components/ui/FormInput'
import { AuthContext } from '@/contexts/AuthContext'
import { useSetUser } from '@/contexts/UserContext'
import { AuthApi } from '@/lib/api/authApi'
import { UserApi } from '@/lib/api/userApi'
import { AxiosError } from 'axios'
import { useContext, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export function Login() {
  const setUser = useSetUser()
  const navigate = useNavigate()
  type LoginValues = {
    usernameOrEmail: string
    password: string
  }

  const { accessToken, login } = useContext(AuthContext)

  const { register, handleSubmit } = useForm<LoginValues>()
  const onSubmit: SubmitHandler<LoginValues> = async data => {
    try {
      const response = await AuthApi.login(data)
      if (response.status === 200) {
        const userResponse = await UserApi.getCurrentUser()
        setUser(userResponse.data)

        login(response.data.accessToken)
        navigate('/')
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message.fieldErrors)
      }
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center px-16 py-20 text-primary-content">
      <div className='bg-primary px-10 py-4 rounded-lg flex justify-center items-center flex-col'>
        <h1 className="text mb-6 mt-6 text-3xl font-bold">Login</h1>
        <form className="flex w-72 flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="usernameOrEmail" className="label">
            Username
          </label>
          <FormInput inputProps={register('usernameOrEmail')} type="text" />
          <label htmlFor="password" className="label">
            Password
          </label>
          <FormInput inputProps={register('password')} type="password" />
          <input type="submit" className="btn mt-10" value={'Login'} />
        </form>
        <p className="mt-5">
          Don't have an account?{' '}
          <Link to={'/register'} className="link">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
