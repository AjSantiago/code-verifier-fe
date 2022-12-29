import { useState } from 'react';
import {
  Dropzone,
  FileItem,
  FileValidated,
  FullScreenPreview,
  VideoPreview,
} from '@dropzone-ui/react';

export const FileUploader = () => {
  const [files, setFiles] = useState<FileValidated[]>([]);
  const [imageSrc, setImageSrc] = useState<any>(undefined);
  const [videoSrc, setVideoSrc] = useState<any>(undefined);

  const updateFiles = (incommingFiles: FileValidated[]) => {
    setFiles(incommingFiles);
  };

  const handleSee = (imageSource: any) => {
    setImageSrc(imageSource);
  };

  const handleWatch = (vidSrc: any) => {
    setVideoSrc(vidSrc);
  };

  const handleClean = (files: FileValidated[]) => {
    console.log('list cleaned', files);
  };

  const handleUpload = (response: any) => {
    //check the responses here
    console.log('responses', response);
  };

  const removeFile = (id: string | number | undefined) => {
    if (id) setFiles(files.filter((x) => x.id !== id));
  };

  return (
    <Dropzone
      style={{ minWidth: '505px' }}
      //label='Drag & drop files here or click to browse'
      onChange={updateFiles}
      onClean={handleClean}
      value={files}
      maxFiles={5}
      //maxFileSize={2998000}
      //accept='.png,image/*'
      url='http://localhost:8000/api/katas/uploadFile'
      //fakeUploading
      onUploadFinish={handleUpload}
    >
      {files.map((file: FileValidated) => (
        <FileItem
          {...file}
          key={file.id}
          onDelete={() => removeFile(file.id)}
          onSee={handleSee}
          onWatch={handleWatch}
          resultOnTooltip
          preview
          info
          hd
        />
      ))}
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={(e: any) => handleSee(undefined)}
      />
      <VideoPreview
        videoSrc={videoSrc}
        openVideo={videoSrc}
        onClose={(e: any) => handleWatch(undefined)}
        controls
        autoplay
      />
    </Dropzone>
  );
};
