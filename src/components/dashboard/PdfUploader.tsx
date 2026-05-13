type PdfUploaderProps = {
  setUploadedFile: (file: any) => void;
};

const PdfUploader = ({
  setUploadedFile,
}: PdfUploaderProps) => {

  const handleFileChange = (event: any) => {

    // Get selected file
    const file = event.target.files[0];

    // No file selected
    if (!file) return;

    // Validate PDF
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    // Print file details
    console.log(file);

    // Store uploaded file
    setUploadedFile(file);
  };

  return (
    <div className="flex flex-col items-center">

      {/* Upload Button */}
      <label className="cursor-pointer rounded-2xl bg-blue-600 px-8 py-4 text-sm font-medium text-white transition hover:bg-blue-700">

        Upload PDF

        {/* Hidden File Input */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />

      </label>

      <p className="mt-4 text-sm text-zinc-500">
        Supports PDF files up to 20MB
      </p>

    </div>
  );
};

export default PdfUploader;