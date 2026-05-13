type DashboardHeroProps = {
  name: string;
};

const DashboardHero = ({
  name,
}: DashboardHeroProps) => {
  return (
    <div className="flex max-w-3xl flex-col items-center text-center">

      {/* Welcome Text */}
      <h1 className="text-6xl font-bold tracking-tight">
        Welcome Back, {name}
      </h1>

      <p className="mt-5 text-xl leading-8 text-zinc-400">
        Upload your study material and generate smart AI-powered
        notes, summaries, revision material, and answers instantly.
      </p>

      

    </div>
  );
};

export default DashboardHero;