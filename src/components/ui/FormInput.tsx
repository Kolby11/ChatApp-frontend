type Props = {
  inputProps: Record<string, any>
  type: string
}

export function FormInput(props: Props) {
  return (
    <input className=" rounded-md border border-slate-600 bg-transparent" {...props.inputProps} type={props.type} />
  )
}
