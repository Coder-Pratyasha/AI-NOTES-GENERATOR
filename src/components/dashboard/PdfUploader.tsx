type PdfUploaderProps = {
  setUploadedFile: (file: any) => void;
};

const PdfUploader = ({
  setUploadedFile,
}: PdfUploaderProps) => {

  const handleFileChange = async (event: any) => {

  const file = event.target.files[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    alert("Please upload a PDF file");
    return;
  }

  try {

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/extract`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);

    setUploadedFile(file);

    alert("PDF uploaded successfully");

  } catch (error) {

    console.log(error);

    alert("Upload failed");
  }
};

  return (
    <div className="flex w-full flex-col items-center px-4">

      {/* Upload Button */}
      <label className="w-full max-w-xs cursor-pointer rounded-2xl bg-blue-600 px-8 py-4 text-center text-sm font-medium text-white transition hover:bg-blue-700">
        Upload PDF

        {/* Hidden File Input */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />

      </label>

      <p className="mt-4 text-center text-sm text-zinc-500">
        Supports PDF files up to 20MB
      </p>

    </div>
  );
};

export default PdfUploader;