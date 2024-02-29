type Props = {
  inputProps: Record<string, any>
  type: string
}

export function FormInput(props: Props) {
  return (
    <input className="input-primary input text-primary-content" {...props.inputProps} type={props.type} />
  )
}
