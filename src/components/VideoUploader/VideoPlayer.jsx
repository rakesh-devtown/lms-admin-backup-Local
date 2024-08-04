import { X } from "lucide-react";
import { getExtension } from "../../utils/utils";

const VideoPlayer = ({ video, open, onClose }) => {

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="p-10 relative">
                <div className="absolute top-2 right-1 mt-12 mr-11">
                    <button
                        onClick={onClose}>
                        <X className='text-white' />
                    </button>
                </div>
                <div className="flex-1 bg-white mt-12 rounded-lg w-[100vh] h-[60vh] overflow-auto">
                    <video
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        controlsList="nodownload"
                    >
                        <source src={video} type={`video/mp4`} />
                    </video>
                </div>
                </div>
            </div>
    );
}

export default VideoPlayer;