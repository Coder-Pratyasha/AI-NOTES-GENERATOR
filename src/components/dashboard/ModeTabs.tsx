type ModeTabsProps = {
  selectedMode: string;
  setSelectedMode: any;
};

const modes = [
  "Ask AI",
  "Short Notes",
  "2 Marks",
  "5 Marks",
  "Revision",
];

const ModeTabs = ({
  selectedMode,
  setSelectedMode,
}: ModeTabsProps) => {

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">

      {modes.map((mode) => (

        <button
          key={mode}
          onClick={() =>
            setSelectedMode(mode)
          }
          className={`rounded-2xl border px-4 md:px-5 py-2.5 text-xs md:text-sm font-medium transition-all duration-200 ${
            selectedMode === mode
              ? "border-blue-400/20 bg-blue-500/20 text-white"
              : "border-white/5 bg-white/[0.03] text-zinc-400 hover:bg-white/[0.05]"
          }`}
        >
          {mode}
        </button>
      ))}

    </div>
  );
};

export default ModeTabs;