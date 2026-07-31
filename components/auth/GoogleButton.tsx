import Image from "next/image";

export default function GoogleButton() {
  return (
    <button
      type="button"
      className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white font-medium text-slate-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 active:scale-[0.99]"
    >
      <Image
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        width={20}
        height={20}
      />

      <span>Continue with Google</span>
    </button>
  );
}
