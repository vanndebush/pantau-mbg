const dataSPPG = [
  {
    id: 'SPPG-SMG-001',
    nama: 'SPPG Kec. Tembalang',
    suplai: ['SDN 1 Tembalang', 'SMPN 33 Semarang'],
    menuHariIni: [
      { nama: 'Nasi Putih', sumber: 'Beras Lokal Jateng' },
      { nama: 'Ayam Teriyaki', sumber: 'PT Unggas Jaya' },
      { nama: 'Sayur Bayam Jagung', sumber: 'Pasar Johar' },
      { nama: 'Susu UHT 200ml', sumber: 'KUD Susu' }
    ],
    persentaseDimakan: 92,
    status: 'Beroperasi'
  },
  {
    id: 'SPPG-SMG-002',
    nama: 'SPPG Kec. Banyumanik',
    suplai: ['SDN 2 Srondol', 'PAUD Melati'],
    menuHariIni: [
      { nama: 'Nasi Merah', sumber: 'Petani Lokal' },
      { nama: 'Telur Dadar Sayur', sumber: 'Peternakan Sejahtera' },
      { nama: 'Buah Pisang', sumber: 'Pasar Banyumanik' }
    ],
    persentaseDimakan: 85,
    status: 'Beroperasi'
  },
  {
    id: 'SPPG-SMG-003',
    nama: 'SPPG Kec. Pedurungan',
    suplai: ['SDN Tlogosari 1', 'SMPN 14'],
    menuHariIni: [
      { nama: 'Nasi Putih', sumber: 'Beras Lokal Jateng' },
      { nama: 'Ikan Lele Goreng', sumber: 'Tambak Kaligawe' },
      { nama: 'Tumis Buncis', sumber: 'Pasar Induk' }
    ],
    persentaseDimakan: 78,
    status: 'Beroperasi'
  }
];
const dataLaporan = {
  'LPR-1029': {
    idLapor: 'LPR-1029',
    sppg: 'SPPG Kec. Pedurungan',
    kategori: 'Porsi terlalu sedikit',
    tanggal: '22 Juni 2026',
    progress: [
      { waktu: '08:00 WIB', status: 'Laporan Diterima', aktif: true },
      { waktu: '10:30 WIB', status: 'Investigasi Lapangan', aktif: true },
      { waktu: '-', status: 'Tindakan Korektif', aktif: false },
      { waktu: '-', status: 'Selesai', aktif: false }
    ]
  }
};