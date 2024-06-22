import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({flag,value,setValue}) => {
    const [data, setData] = useState(value)

    return (
        <div className="rounded-lg">
            <ReactQuill
                value={value}
                onChange={setValue}
                className={`px-4 rounded-lg ${flag===1 ? 'h-56' : 'h-20'} font-poppins`}
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'align': [] }],
                        [{ 'font': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' },
                        { 'indent': '-1' }, { 'indent': '+1' }],
                        ['link', 'image', 'video'],
                        ['clean'] 
                    ],
                }}
                formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video'
                ]}
                placeholder={`Add your ${flag===1 ? 'module description' : 'notes'} here...`}
            />
        </div>
    );
};

export default RichTextEditor;
