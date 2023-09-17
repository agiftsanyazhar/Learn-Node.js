function cetakNama(nama) {
  return `Halo, nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
  nama: "Dody",
  umur: "22",
  cetakMhs() {
    return `Halo, nama saya ${this.nama}, umur ${this.umur} tahun`;
  },
};

module.exports.cetakNama = cetakNama;
module.exports.PI = PI;
module.exports.mahasiswa = mahasiswa;
