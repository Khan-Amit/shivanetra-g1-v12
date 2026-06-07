// e. Natal Chart Creation Component
export function generateNatalChartUI() {
  return `
    <div class="grid grid-cols-3 gap-1 text-center font-mono text-[10px] bg-black p-2 border border-neutral-900 rounded">
      <div class="border border-neutral-800 p-2 text-neutral-500">XII<br>Hous</div>
      <div class="border border-neutral-800 p-2 text-brand-green font-bold">I<br>Asc</div>
      <div class="border border-neutral-800 p-2 text-neutral-500">II<br>Hous</div>
      <div class="border border-neutral-800 p-2 font-bold text-white">XI<br>Ju/Me</div>
      <div class="border border-neutral-800 p-4 bg-neutral-900/50 text-neutral-600 font-sans font-bold text-[9px]">SURYA<br>GRID</div>
      <div class="border border-neutral-800 p-2 font-bold text-white">III<br>Su/Ve</div>
      <div class="border border-neutral-800 p-2 text-neutral-500">X<br>Hous</div>
      <div class="border border-neutral-800 p-2 font-bold text-brand-red">IX<br>Sa/Ra</div>
      <div class="border border-neutral-800 p-2 text-neutral-500">IV<br>Hous</div>
    </div>
  `;
}
