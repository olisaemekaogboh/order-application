import React, { useRef } from 'react'
import clsx from 'clsx'
import { Upload, X, File } from 'lucide-react'

const FileUpload = ({
  accept,
  multiple = false,
  maxSize = 5 * 1024 * 1024, // 5MB
  onUpload,
  onRemove,
  files = [],
  className = '',
}) => {
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const newFiles = Array.from(e.target.files)
    // Filter by size
    const valid = newFiles.filter((f) => f.size <= maxSize)
    if (valid.length !== newFiles.length) {
      alert(`Some files exceed the ${maxSize / 1024 / 1024}MB limit`)
    }
    onUpload?.(valid)
    e.target.value = ''
  }

  const handleRemove = (file) => {
    onRemove?.(file)
  }

  return (
    <div className={clsx('space-y-3', className)}>
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition"
      >
        <Upload className="mx-auto h-10 w-10 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {accept || 'Any file'} up to {maxSize / 1024 / 1024}MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md"
            >
              <div className="flex items-center gap-2 truncate">
                <File size={16} className="text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {file.name}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
              <button
                onClick={() => handleRemove(file)}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


export default FileUpload