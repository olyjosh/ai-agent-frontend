import { useState } from "react";
import api from '@/api';

function PhotoUploadDialog({ open, onClose, onUpload, onCompleted }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (email) => {
        setLoading(true);
        setError(null);
        email = "olyjoshone@gmail.com"+".jpeg"

        try {            
            onUpload(file);
            const url = (await api.getPhotoPresignedUrl(email, 'upload')).data;
            
            await api.putProfilePhoto(url, file);
            
            onCompleted()
            onClose();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? 'block' : 'hidden'}`}>
            <div className="relative w-1/3 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Upload Photo</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>
                <div className="p-4">
                    <input type="file" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" />
                    {error && <p className="mt-2 text-red-600">{error}</p>}
                </div>
                <div className="flex justify-end p-4 border-t border-gray-200">
                    <button onClick={onClose} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                        Cancel
                    </button>
                    <button onClick={handleUpload} disabled={loading} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PhotoUploadDialog;