type Props = {
  inputProps: Record<string, any>
  type: string
}

export function FormInput(props: Props) {
  return (
    <input className="input-secondary input" {...props.inputProps} type={props.type} />
  )
}
