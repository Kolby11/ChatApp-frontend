import { FormInput } from '@/components/ui/FormInput'
import { SubmitHandler, useForm } from 'react-hook-form'

export function Register() {
  type RegisterValues = {
    username: string
    email: string
    password: string
    confirmPassword: string
  }
  const { register, handleSubmit } = useForm<RegisterValues>()
  const onSubmit: SubmitHandler<RegisterValues> = data => console.log(data)

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-lg border border-gray-700 bg-slate-900 bg-opacity-80  px-16 py-20">
      <h1 className="text mb-10 text-3xl font-bold">Register</h1>
      <form className="flex w-72 flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <FormInput inputProps={register('username')} type="text" />
        <label htmlFor="email">Email</label>
        <FormInput inputProps={register('email')} type="email" />
        <label htmlFor="password">Password</label>
        <FormInput inputProps={register('password')} type="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <FormInput inputProps={register('confirmPassword')} type="password" />
        <input
          type="submit"
          className=" mt-5 cursor-pointer rounded-lg border border-slate-700 bg-white p-1 font-semibold text-black shadow-lg "
          value={'Register'}
        />
      </form>
    </div>
  )
}
