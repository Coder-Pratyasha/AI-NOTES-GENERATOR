type ResultSectionProps = {
  messages: any[];
};

const ResultSection = ({
  messages,
}: ResultSectionProps) => {
  return (
    <div className="w-full space-y-10 pb-40">

      {messages.map((message, index) => (

        <div key={index}>

          {/* USER MESSAGE */}
          {message.role === "user" && (

            <div className="flex w-full ">

              <div className="max-w-2xl rounded-3xl bg-blue-600 px-6 py-4 text-sm text-white shadow-lg">

                {message.content}

              </div>

            </div>

          )}

          {/* AI RESPONSE */}
          {message.role === "ai" && (

            <div className="w-full px-4 py-2">

              <div className="w-full text-[16px] leading-9 text-zinc-200">

                {message.content}

              </div>

            </div>

          )}

        </div>

      ))}

    </div>
  );
};

export default ResultSection;