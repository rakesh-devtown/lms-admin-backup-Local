import { useState, useRef, useEffect } from "react";
import {
  X,
  Trash2,
  Edit,
  Book,
  BookA,
  NotebookTextIcon,
  Video,
  GalleryThumbnailsIcon,
  LucideGalleryThumbnails,
  GalleryVerticalEnd,
} from "lucide-react";
import RichTextEditor from "../UI/RichTextEditor";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Loader/Spinner";
import {
  addSectionItemData,
  getSectionItemById,
} from "../../store/slice/courseReducer";
import { notification } from "antd";
import { uploadFile } from "../../store/slice/uploadReducer";
import VideoUploadModal from "../VideoUploader/VideoUploadModal";
import VideoPlayer from "../VideoUploader/VideoPlayer";
const EditLectureModal = ({ isVisible, onClose }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoModal, setVideoModal] = useState(false);
  const [videoPlayerModal, setVideoPlayerModal] = useState({
    visible: false,
    url: "",
  });
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [moduleDescription, setModuleDescription] = useState("");
  const { currentSectionItem, loading, currentCourse } = useSelector(
    (state) => state.course,
  );
  const dispatch = useDispatch();

  const handleVideoButtonClick = () => {
    videoInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const url = await dispatch(
        uploadFile(
          file,
          "",
          `/course/${currentCourse?.id || "section"}/studyMaterial`,
        ),
      );
      if (url) {
        setSelectedFile(file);
        setFormData({ ...formData, studyMaterial: url });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleStudyFileClick = () => {
    fileInputRef.current.click();
  };

  const handleThumbnailButtonClick = () => {
    thumbnailInputRef.current.click();
  };

  const handleThumbnailChange = async (event) => {
    try {
      try {
        const file = event.target.files[0];
        if (!file) {
          return;
        }
        const url = await dispatch(
          uploadFile(file, "", `/course/${currentCourse?.id}/thumbnail`),
        );
        if (url) {
          setSelectedThumbnail(file);
          setFormData({ ...formData, videoThumbnail: url });
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDescriptionChange = (event) => {
    const text = event.target.value;
    if (text.length <= 100) {
      setFormData({ ...formData, title: text });
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    note: "",
    link: "",
    studyMaterial: "",
    videoThumbnail: "",
    isPublished: true,
  });

  const saveLecture = async () => {
    try {
      if (!currentSectionItem?.id)
        return notification.error({
          message: "Error",
          description: "please refresh the page and try again",
        });
      const data = {
        title: String(formData?.title).trim(),
        ...formData,
      };
      //if(data.title.length === 0) return notification.error({message:'Error',description:'Please enter the title'});
      if (data?.title?.length === 0 || !data?.title)
        return notification.error({
          message: "Error",
          description: "Please enter the title",
        });
      const res = await dispatch(
        addSectionItemData(data, currentSectionItem?.id),
      );
      if (res) {
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleVideoUploadClose = async () => {
    try {
      setVideoModal(false);
      await dispatch(getSectionItemById(currentSectionItem?.id));
    } catch (err) {
      console.log(err);
    }
  };

  if (!isVisible) return null;

  useEffect(() => {
    if (currentSectionItem) {
      setFormData({
        title: currentSectionItem?.title,
        content: currentSectionItem?.content,
        note: currentSectionItem?.note,
        link: currentSectionItem?.link,
        studyMaterial: currentSectionItem?.studyMaterial,
        video: currentSectionItem?.videoLink,
        videoThumbnail: currentSectionItem?.videoThumbnail,
        isPublished: true,
      });

      console.log(currentSectionItem);

      if (currentSectionItem?.studyMaterial) {
        setSelectedFile({
          name: String(currentSectionItem?.studyMaterial).substring(
            String(currentSectionItem?.studyMaterial).length - 36,
          ),
        });
      }
      if (currentSectionItem?.videoThumbnail) {
        setSelectedThumbnail({
          name: String(currentSectionItem?.videoThumbnail).substring(
            String(currentSectionItem?.videoThumbnail).length - 36,
          ),
        });
      }
    }
  }, [currentSectionItem]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-10">
        {loading && <Spinner />}
        <div className="absolute right-1 top-2 mr-11 mt-12">
          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>
        <div className="mt-12 h-[80vh] w-[120vh] flex-1 overflow-auto rounded-lg bg-white">
          <div className="border-b-2 p-4 pb-3 font-poppins text-slate-700">
            <span>Add Class Details</span>
          </div>
          <div className="flex flex-col space-y-2 pb-20">
            <div className="flex items-center justify-between pt-4">
              <span className="text-normal pt- mx-4 font-poppins text-[#2F366E]">
                Lecture Name
              </span>
              <span className="px-5 font-poppins text-sm">
                {moduleDescription.length}/100
              </span>
            </div>
            <div className="m-0 flex items-center gap-2">
              <p className="ml-3 text-gray-500">
                Day {currentSectionItem?.orderNumber}:
              </p>
              <input
                type="text"
                placeholder="Add your module name"
                className="mr-3 flex-grow rounded-md border-2 p-2 font-poppins text-sm text-[#2F366E] placeholder:font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData?.title}
                onChange={handleDescriptionChange}
              />
            </div>
            <span className="text-normal mx-4 flex flex-col pb-1 pt-4 font-poppins text-[#2F366E]">
              Upload Lecture Video
              <span className="font-poppins text-xs text-slate-400">
                Supported File: MP4, MKV, etc.
              </span>
            </span>
            {formData.video ? (
              <div className="mx-4 flex h-28 items-center justify-between">
                <div className="flex items-center">
                  <Video
                    className="mx-5 h-[7vh] w-[7vh] rounded-md object-cover"
                    color="blue"
                  />
                  <button
                    onClick={() => {
                      setVideoPlayerModal({
                        visible: true,
                        url: formData?.video,
                      });
                    }}
                  >
                    <span className="font-poppins text-sm text-[#0859DE]">
                      {String(formData?.video)?.substring(
                        String(formData?.video).length - 36,
                      )}
                    </span>
                  </button>
                </div>
                <button
                  className="rounded-md border-0 px-5 font-poppins text-blue-500 transition"
                  onClick={() => setVideoModal(true)}
                >
                  <Edit size={20} />
                </button>
              </div>
            ) : (
              <button
                className="mx-4 mt-4 w-[20%] rounded-md border bg-blue-500 px-4 py-2 font-poppins text-white"
                onClick={() => setVideoModal(true)}
              >
                Upload
              </button>
            )}
            <div className="flex items-center justify-between pt-4">
              <span className="text-noraml pt- mx-4 font-poppins text-[#2F366E]">
                Description
              </span>
            </div>
            <div className="w-full font-poppins">
              <RichTextEditor
                flag={1}
                value={formData.content}
                setValue={(value) =>
                  setFormData({ ...formData, content: value })
                }
              />
            </div>
            <span className="text-normal mx-4 pt-14 font-poppins text-[#2F366E]">
              Notes
            </span>
            <div className="w-full font-poppins">
              <RichTextEditor
                flag={2}
                value={formData.note}
                setValue={(value) => setFormData({ ...formData, note: value })}
              />
            </div>
            <span className="text-normal mx-4 flex flex-col pb-1 pt-14 font-poppins text-[#2F366E]">
              Study Materials
              <span className="font-poppins text-xs text-slate-400">
                Upload any files to help your students complete this module
              </span>
            </span>
            <div className="mx-4 flex h-28 items-center justify-center rounded-lg border border-dashed border-blue-500 bg-gray-50">
              <div className="text-center">
                {selectedFile ? (
                  <div className="mx-4 flex h-28 items-center justify-between">
                    <div className="flex items-center">
                      <NotebookTextIcon
                        className="mx-5 h-[7vh] w-[7vh] rounded-md object-cover"
                        color="blue"
                      />
                      <a href={formData?.studyMaterial} target="_blank">
                        <span className="font-poppins text-sm text-[#0859DE]">
                          {String(formData?.studyMaterial)?.substring(
                            String(formData?.studyMaterial).length - 36,
                          )}
                        </span>
                      </a>
                    </div>
                    <button
                      className="rounded-md border-0 px-5 font-poppins text-blue-500 transition"
                      onClick={handleStudyFileClick}
                    >
                      <Edit size={20} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-poppins text-sm text-gray-500">
                      Drag Your File(s) Here
                    </p>
                    <button
                      className="mt-4 rounded-md border border-dashed border-blue-500 px-4 py-2 font-poppins text-blue-500 transition hover:bg-blue-500 hover:text-white"
                      onClick={handleStudyFileClick}
                    >
                      Upload
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </>
                )}
              </div>
            </div>
            <span className="text-normal mx-4 pt-4 font-poppins text-[#2F366E]">
              Link
            </span>
            <input
              type="text"
              placeholder="URL"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className="m-3 rounded-md border-2 p-2 font-poppins text-sm text-gray-700 placeholder:font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* // Video Thumbnail */}

            <span className="text-normal mx-4 flex flex-col pb-1 pt-4 font-poppins text-[#2F366E]">
              Video Thumbnail
              <span className="font-poppins text-xs text-slate-400">
                Upload any files to help your students complete this module
              </span>
            </span>
            <div className="mx-4 flex h-28 items-center justify-center rounded-lg border border-dashed border-blue-500 bg-gray-50">
              <div className="text-center">
                {selectedThumbnail ? (
                  <div className="mx-4 flex h-28 items-center justify-between">
                    <div className="flex items-center">
                      <GalleryVerticalEnd
                        className="mx-5 h-[7vh] w-[7vh] rounded-md object-cover"
                        color="blue"
                      />
                      <a href={formData?.videoThumbnail} target="_blank">
                        <span className="font-poppins text-sm text-[#0859DE]">
                          {String(formData?.videoThumbnail)?.substring(
                            String(formData?.videoThumbnail).length - 36,
                          )}
                        </span>
                      </a>
                    </div>
                    <button
                      className="rounded-md border-0 px-5 font-poppins text-blue-500 transition"
                      onClick={handleThumbnailButtonClick}
                    >
                      <Edit size={20} />
                    </button>
                    <input
                      type="file"
                      ref={thumbnailInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-poppins text-sm text-gray-500">
                      Drag Your File(s) Here
                    </p>
                    <button
                      className="mt-4 rounded-md border border-dashed border-blue-500 px-4 py-2 font-poppins text-blue-500 transition hover:bg-blue-500 hover:text-white"
                      onClick={handleThumbnailButtonClick}
                    >
                      Upload
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={thumbnailInputRef}
                      className="hidden"
                      onChange={handleThumbnailChange}
                    />
                  </>
                )}
              </div>
            </div>

            {/* //Video Upload */}
          </div>
          <div className="sticky bottom-0 mt-1 flex justify-between border-2 bg-white">
            <button className="m-2 flex items-center rounded-md border-2 border-[#A0B5D7] p-2 px-4 font-poppins text-sm font-medium text-blue-900 transition hover:bg-slate-200">
              <Trash2 size={18} className="mr-2 text-blue-900" />
              <span className="">Clear</span>
            </button>
            <button
              onClick={saveLecture}
              className="m-2 rounded-md bg-[#0859DE] px-14 py-1 font-poppins text-sm text-white transition hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      {videoModal && (
        <VideoUploadModal
          onClose={handleVideoUploadClose}
          visible={videoModal}
        />
      )}
      {videoPlayerModal.visible && (
        <VideoPlayer
          open={videoPlayerModal.visible}
          video={videoPlayerModal.url}
          onClose={() => setVideoPlayerModal({ visible: false, url: null })}
        />
      )}
    </div>
  );
};

export default EditLectureModal;
