export default function ProgressSteps() {
  const steps = [
    {
      id: 1,
      title: "Create account",
      active: true,
    },
    {
      id: 2,
      title: "Personalize",
      active: false,
    },
    {
      id: 3,
      title: "Done",
      active: false,
    },
  ];

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`flex items-center ${
            index !== steps.length - 1 ? "flex-1" : ""
          }`}
        >
          {/* Step */}
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-all ${
                step.active
                  ? "border-[#172544] bg-[#172544] text-white"
                  : "border-gray-300 bg-white text-gray-500"
              }`}
            >
              {step.id}
            </div>

            <span
              className={`hidden text-sm font-medium sm:block ${
                step.active ? "text-slate-900" : "text-slate-400"
              }`}
            >
              {step.title}
            </span>
          </div>

          {/* Connector */}
          {index !== steps.length - 1 && (
            <div className="mx-4 h-px flex-1 bg-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
}
