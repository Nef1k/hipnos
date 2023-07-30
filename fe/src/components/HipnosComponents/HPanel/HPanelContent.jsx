const HPanelContent = ({children, style}) => {
  return (
    <div style={{...style, "overflow": "hidden"}}>{children}</div>
  )
}

export default HPanelContent;
