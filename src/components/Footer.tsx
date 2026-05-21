export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white px-5 py-5 mt-8">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="text-sm font-bold mb-1 tracking-wide">PBPK Model Registry</div>
          <div className="text-xs opacity-85 italic">
            Systems Biology Markup Language model deployment dashboard
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm mb-1">InsilicoVida Research Group</div>
          <div className="text-xs opacity-80">
            <a href="https://github.com/Crispae/wasm-pk" className="text-white no-underline ml-3 hover:underline">wasm-pk</a>
            <a href="https://github.com/Crispae/PBPK-BoilerPlate-UI" className="text-white no-underline ml-3 hover:underline">Boilerplate</a>
          </div>
        </div>
        <div className="w-full border-t border-white/20 my-3" />
        <div className="w-full text-center text-xs opacity-70">
          &copy; {currentYear} Built with React, Tailwind CSS, GitHub Pages, and the wasm-pk platform.
        </div>
      </div>
    </footer>
  );
}
