type Props = {
  inputProps: Record<string, any>
  type: string
}

export function FormInput(props: Props) {
  return (
    <input className="input" {...props.inputProps} type={props.type} />
  )
}
