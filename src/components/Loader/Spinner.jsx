import { Spin } from "antd";

const Spinner = ({large})=>{
    return(
        <div className=' bg-[rgba(0,0,0,0.2)] z-10 absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
          <Spin size={large ? 'large' : 'small'}/>
        </div>
    )
}
export default Spinner;