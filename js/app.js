let currentSppgId = null;

function navTo(pageId) {
  document.querySelectorAll('.page-section').forEach(el => {
    el.classList.remove('page-active');
  });
  document.getElementById(pageId).classList.add('page-active');
  window.scrollTo(0, 0);

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('text-bgn-blue');
    btn.classList.add('text-gray-400');
  });

  if(pageId === 'page-home') document.getElementById('nav-page-home').classList.replace('text-gray-400', 'text-bgn-blue');
  if(pageId === 'page-search') document.getElementById('nav-page-search').classList.replace('text-gray-400', 'text-bgn-blue');
  if(pageId === 'page-status') document.getElementById('nav-page-status').classList.replace('text-gray-400', 'text-bgn-blue');

  if(pageId === 'page-search') renderDaftarSPPG(dataSPPG);
}

function renderDaftarSPPG(data) {
  const listContainer = document.getElementById('sppg-list');
  listContainer.innerHTML = '';

  data.forEach(sppg => {
    let colorClass = sppg.persentaseDimakan >= 90 ? 'text-green-600' : sppg.persentaseDimakan >= 80 ? 'text-amber-500' : sppg.persentaseDimakan === 0 ? 'text-gray-400' : 'text-red-500';

    let statusBadgeClass = 'bg-green-100 text-green-700';
    if (sppg.status === 'Dalam Evaluasi') statusBadgeClass = 'bg-amber-100 text-amber-700';
    if (sppg.status === 'Persiapan') statusBadgeClass = 'bg-blue-100 text-blue-700';
    if (sppg.status === 'Tutup Sementara') statusBadgeClass = 'bg-red-100 text-red-700';

    const card = `
      <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-3 cursor-pointer hover:shadow-md transition" onclick="bukaDetailSPPG('${sppg.id}')">
        <div class="flex justify-between items-start mb-2">
          <div>
            <span class="text-xs font-semibold bg-blue-100 text-bgn-blue px-2 py-1 rounded-full">${sppg.id}</span>
            <h3 class="font-bold text-gray-800 mt-2">${sppg.nama}</h3>
          </div>
          <span class="text-[10px] font-bold px-2 py-1 rounded ${statusBadgeClass}">${sppg.status}</span>
        </div>
        <p class="text-xs text-gray-500 mb-2">Menyuplai: ${sppg.suplai.join(', ')}</p>
        <div class="flex items-center gap-1 text-sm font-semibold ${colorClass}">
          <i class="fa-solid fa-chart-pie"></i> ${sppg.persentaseDimakan > 0 ? sppg.persentaseDimakan + '% makanan habis' : 'Belum ada data konsumsi'}
        </div>
      </div>
    `;
    listContainer.innerHTML += card;
  });
}

function cariSPPG(keyword) {
  const hasil = dataSPPG.filter(sppg => 
    sppg.nama.toLowerCase().includes(keyword.toLowerCase()) || sppg.suplai.join(' ').toLowerCase().includes(keyword.toLowerCase()) || sppg.status.toLowerCase().includes(keyword.toLowerCase())
  );
  renderDaftarSPPG(hasil);
}

function bukaDetailSPPG(id) {
  const sppg = dataSPPG.find(s => s.id === id);
  if(!sppg) return;

  currentSppgId = sppg.id;

  document.getElementById('detail-id').innerText = sppg.id;
  document.getElementById('detail-nama').innerText = sppg.nama;
  document.getElementById('detail-suplai').innerText = sppg.suplai.join(', ');

  const menuList = document.getElementById('detail-menu');
  menuList.innerHTML = '';
  sppg.menuHariIni.forEach(item => {
    let iconHtml = item.sumber === "-" ? '<i class="fa-solid fa-minus text-gray-400 mr-2"></i>' : '<i class="fa-solid fa-check text-mbg-green mr-2"></i>';
    menuList.innerHTML += `
      <li class="flex flex-col mb-2 border-b pb-1 last:border-0">
        <span class="font-semibold text-gray-800">${iconHtml}${item.nama}</span>
        <span class="text-xs text-gray-500 ml-6">Suplier: ${item.sumber}</span>
      </li>
    `;
  });

  let statsText = sppg.persentaseDimakan > 0 ? `${100 - sppg.persentaseDimakan}% (Tingkat Penolakan/Sisa)` : 'Belum Ada Data Penolakan';
  document.getElementById('detail-stats').innerText = statsText;

  navTo('page-detail');
}

function mulaiLapor() {
  if(!currentSppgId) return;
  const sppg = dataSPPG.find(s => s.id === currentSppgId);
  document.getElementById('form-target').value = `${sppg.nama} (${sppg.id})`;
  navTo('page-lapor');
}

function submitLaporan(e) {
  e.preventDefault();

  const modal = document.getElementById('modal-sukses');
  const content = document.getElementById('modal-content');

  modal.classList.remove('hidden');

  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modal.classList.add('opacity-100');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');
  }, 10);
}

function tutupModalKe(tujuanId) {
  const modal = document.getElementById('modal-sukses');
  const content = document.getElementById('modal-content');

  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0');
  content.classList.remove('scale-100');
  content.classList.add('scale-95');

  setTimeout(() => {
    modal.classList.add('hidden');
    document.getElementById('form-laporan').reset();
    navTo(tujuanId);
  }, 300);
}

function copyKode(e) {
  const kode = document.getElementById('kode-laporan-modal').innerText;
  navigator.clipboard.writeText(kode);

  const btn = e.currentTarget;
  const icon = btn.querySelector('i');

  icon.classList.replace('fa-copy', 'fa-check');
  icon.classList.add('text-mbg-green');

  setTimeout(() => {
    icon.classList.replace('fa-check', 'fa-copy');
    icon.classList.remove('text-mbg-green');
  }, 2000);
}

function kirimEmailKode(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const originalText = btn.innerHTML;

  btn.innerHTML = `<i class="fa-solid fa-check"></i> Terkirim`;
  btn.classList.replace('bg-gray-800', 'bg-mbg-green');
  btn.classList.replace('hover:bg-gray-900', 'hover:bg-green-700');

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.classList.replace('bg-mbg-green', 'bg-gray-800');
    btn.classList.replace('hover:bg-green-700', 'hover:bg-gray-900');
    e.target.reset();
  }, 3000);
}

function cekStatusLaporan() {
  const kode = document.getElementById('input-kode-lapor').value;
  const hasil = dataLaporan[kode];
  const container = document.getElementById('hasil-status');

  if(!hasil) {
      container.innerHTML = `<p class="text-red-500 text-sm text-center font-bold mt-4">Kode laporan tidak ditemukan.</p>`;
      return;
  }

  let progressHtml = '';
  hasil.progress.forEach(step => {
    let dotColor = step.aktif ? 'bg-mbg-green' : 'bg-gray-300';
    let textColor = step.aktif ? 'text-gray-800 font-bold' : 'text-gray-400';
    progressHtml += `
      <div class="flex gap-4 mb-4">
        <div class="w-3 h-3 mt-1.5 rounded-full ${dotColor}"></div>
        <div>
          <p class="${textColor} text-sm">${step.status}</p>
          <p class="text-xs text-gray-500">${step.waktu}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
      <h4 class="font-bold text-gray-800 border-b pb-2 mb-3">ID: ${hasil.idLapor} <br><span class="text-xs text-gray-500 font-normal">Target: ${hasil.sppg}</span></h4>
      <div class="border-l-2 border-gray-200 ml-1.5 pl-4 py-1">${progressHtml}</div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('consumptionChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: { labels: ['Habis Dimakan', 'Sisa/Dibuang'], datasets: [{ data: [88, 12], backgroundColor: ['#16a34a', '#fbbf24'] }] },
    options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom' } } }
  });
});