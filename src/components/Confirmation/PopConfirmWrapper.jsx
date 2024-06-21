import { Popconfirm } from "antd";

const PopConfirmWrapper=({children, ...props})=>{
  return (
    <Popconfirm 
        title="Delete the Module?"
        description="Are you sure to delete this Module? It will delete all Lectures in it."
        okText="Yes"
        cancelText="No"
        {...props}>
      {children}
    </Popconfirm>
  )
}
export default PopConfirmWrapper;