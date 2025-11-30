/**
 * KONFIGURASI DATABASE (WAJIB)
 */
const DB_CONFIG = {
  SPREADSHEET_ID: 'spreadsheet id', // ID Sheet Anda (Harus Sama)
  SHEET_NAME_SISWA: 'DATA_SISWA',
  SHEET_NAME_NILAI: 'NILAI_SISWA'
};

function doGet(e) {
  return HtmlService.createTemplateFromFile('Index').evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle("Portal Data Siswa");
}

function convertDriveLink(url) {
  if (!url) return "https://placehold.co/250x320?text=No+Photo"; // Jika Siswa Belum Memiliki Foto
  const idMatch = url.match(/[-\w]{25,}/);
  if (idMatch && idMatch.length > 0) {
    return "https://lh3.googleusercontent.com/d/" + idMatch[0];
  }
  return url;
}

/**
 * FUNGSI UTAMA: Mengambil Data Profil Siswa
 */
function getStudentProfile(rawNisn) {
  try {
    // Validasi Input memastikan hanya angka
    if (!/^\d+$/.test(rawNisn)) {
      return null; 
    }
    const searchNisnNumber = Number(rawNisn); 

    const ss = SpreadsheetApp.openById(DB_CONFIG.SPREADSHEET_ID);
    const profileSheet = ss.getSheetByName(DB_CONFIG.SHEET_NAME_SISWA);
    const gradesSheet = ss.getSheetByName(DB_CONFIG.SHEET_NAME_NILAI);
    
    if (!profileSheet || !gradesSheet) {
      throw new Error("Database tidak ditemukan."); 
    }
    
    const profileDataAll = profileSheet.getDataRange().getDisplayValues();
    profileDataAll.shift(); 
    
    const rowIndex = profileDataAll.findIndex(row => {
      let sheetNisn = row[0]; 
      // Cek apakah sel kosong atau bukan angka
      if(!sheetNisn || isNaN(Number(sheetNisn))) return false;
      
      return Number(sheetNisn) === searchNisnNumber;
    });
    
    if (rowIndex === -1) {
      return null; // Data Siswa tidak ditemukan
    }

    const profileRow = profileDataAll[rowIndex];

    // Proses URL Foto
    const rawPhotoUrl = profileRow[11]; 
    const cleanPhotoUrl = convertDriveLink(rawPhotoUrl);

    let profile = {
      NISN: profileRow[0] || "-",
      NIS: profileRow[1] || "-",
      NamaLengkapSiswa: profileRow[2] || "-",
      Kelas: profileRow[3] || "-",
      JenisKelamin: profileRow[4] || "-",
      Agama: profileRow[5] || "-",
      TempatLahir: profileRow[6] || "-",
      TanggalLahir: profileRow[7] || "-",
      NamaAyah: profileRow[8] || "-",
      NamaIbu: profileRow[9] || "-",
      KontakWali: profileRow[10] || "-",
      FotoURL: cleanPhotoUrl
    };

    // --- AMBIL DATA NILAI ---
    // Struktur SpreadSheet :
    // Col A [0]: Nama Siswa
    // Col B [1]: Rata-Rata Nilai Siswa Semester 1
    // Col C [2]: Rata-Rata Nilai Siswa Semester 2
    
    const gradesDataAll = gradesSheet.getDataRange().getValues();
    gradesDataAll.shift(); // Hapus Header

    // Pastikan baris nilai ada (Sinkronisasi Baris)
    const gradesRow = gradesDataAll[rowIndex];

    if (gradesRow) {
      let smt1 = Number(gradesRow[1]); 
      let smt2 = Number(gradesRow[2]);

      if (isNaN(smt1)) smt1 = 0;
      if (isNaN(smt2)) smt2 = 0;
      
      profile.RataRataSemester1 = smt1.toFixed(2);
      profile.RataRataSemester2 = smt2.toFixed(2);

      if (smt1 > 0 || smt2 > 0) {
         let pembagi = (smt1 > 0 && smt2 > 0) ? 2 : 1;
         profile.RataRataTotal = ((smt1 + smt2) / pembagi).toFixed(2);
      } else {
         profile.RataRataTotal = "0.00";
      }

    } else {
      profile.RataRataSemester1 = "-";
      profile.RataRataSemester2 = "-";
      profile.RataRataTotal = "-";
    }

    return profile;

  } catch (e) {
    console.error("Server Error: " + e.message); 
    return { error: true, message: "Terjadi kesalahan sistem." };
  }
}