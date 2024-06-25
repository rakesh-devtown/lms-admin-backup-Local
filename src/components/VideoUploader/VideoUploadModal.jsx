import React, { useEffect, useState } from 'react';
import Uppy from '@uppy/core';
import {Dashboard, DashboardModal} from '@uppy/react';
import AwsS3Multipart from '@uppy/aws-s3-multipart';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';


const VideoUploadModal=({visible,onClose})=>{
	
  const [uppy, setUppy] = useState(() => null);
  const { currentSectionItem } = useSelector(state => state.course);

  useEffect(() => {
    const uppyInstance = new Uppy({
      autoProceed: true,
      restrictions: {
        maxFileSize: 1000 * 1024 * 1024, // 1GB
        maxNumberOfFiles: 1,
        allowedFileTypes: ['video/*'],
      },
    }).use(AwsS3Multipart, {
      companionUrl: import.meta.env.VITE_APP_VIDEO_UPLOAD_URL, // Your companion server URL
    })

    uppyInstance.on('file-added', (file) => {
      file.meta.sectionId = currentSectionItem?.id;
    });

    setUppy(uppyInstance);

    return () => uppyInstance.close();
  }, []);


  if (!uppy) return null;
	return (
        <>
                {uppy && 
                    <DashboardModal
                        uppy={uppy}
                        open={visible}
                        onRequestClose={onClose}
                        closeModalOnClickOutside={true}
                        proudlyDisplayPoweredByUppy={false}  
                />}
        </>
    )
}

export default VideoUploadModal;