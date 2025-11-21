// Data Gaji Pokok (A: index 0, B: index 1, C: index 2)
const GAJI_POKOK = {
    'A': 5000000,
    'B': 6500000,
    'C': 9500000
};

// Data Persentase Lembur (dalam desimal)
// index 0: 1 Jam (30%), 1: 2 Jam (32%), 2: 3 Jam (34%), 3: 4 Jam (36%), 4: >= 5 Jam (38%)
const PERSEN_LEMBUR = [0.30, 0.32, 0.34, 0.36, 0.38];

// Fungsi untuk memformat angka menjadi format mata uang Rupiah
function formatRupiah(angka) {
    // Memastikan angka adalah tipe number dan membulatkan ke 2 desimal
    let number = Number(angka).toFixed(2);
    let [integerPart, decimalPart] = number.split('.');
    
    // Format bagian integer dengan titik sebagai pemisah ribuan
    let rupiah = integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    return `Rp. ${rupiah},${decimalPart.padEnd(2, '0')}`;
}

// Fungsi utama untuk menghitung gaji
function hitungGaji() {
    // Ambil nilai input
    const golongan = document.getElementById('golongan').value;
    const jamLembur = parseInt(document.getElementById('jamLembur').value);
    
    // Elemen Output dan Error
    const outputSection = document.getElementById('result-output');
    const errorMsg = document.getElementById('error-message');
    
    // Sembunyikan pesan error dan hasil sebelumnya
    outputSection.style.display = 'none';
    errorMsg.style.display = 'none';

    // --- 1. Validasi Golongan ---
    if (!GAJI_POKOK[golongan]) {
        errorMsg.style.display = 'block';
        return; // Hentikan fungsi
    }
    
    // --- 2. Perhitungan Gaji Pokok ---
    const gajiPokok = GAJI_POKOK[golongan];
    
    // --- 3. Menentukan Persentase Lembur ---
    let persenLembur = 0;
    
    if (jamLembur >= 1 && jamLembur <= 4) {
        // Jika 1-4 Jam, indexnya adalah (jamLembur - 1)
        persenLembur = PERSEN_LEMBUR[jamLembur - 1];
    } else if (jamLembur >= 5) {
        // Jika >= 5 Jam, gunakan index terakhir (index 4)
        persenLembur = PERSEN_LEMBUR[4];
    }
    // Jika jamLembur <= 0, persenLembur tetap 0 (default)

    // --- 4. Perhitungan Gaji Lembur dan Total Gaji ---
    // Rumus Gaji Lembur: Gaji Pokok * Persentase Lembur
    const gajiLembur = gajiPokok * persenLembur;
    
    // Rumus Total Gaji: Gaji Pokok + Gaji Lembur
    const totalGaji = gajiPokok + gajiLembur;

    // --- 5. Tampilkan Hasil ---
    document.getElementById('out-golongan').textContent = golongan;
    document.getElementById('out-gajiPokok').textContent = formatRupiah(gajiPokok);
    document.getElementById('out-jamLembur').textContent = `${jamLembur} Jam`;
    document.getElementById('out-persenLembur').textContent = `${(persenLembur * 100).toFixed(0)}%`;
    document.getElementById('out-gajiLembur').textContent = formatRupiah(gajiLembur);
    document.getElementById('out-totalGaji').textContent = formatRupiah(totalGaji);
    
    outputSection.style.display = 'block';
}
