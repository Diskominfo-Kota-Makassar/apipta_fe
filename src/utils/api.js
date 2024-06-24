import axios from 'axios';

// const baseURL = 'http://localhost:3200/api';
const baseURL = 'https://apipta.makassarkota.go.id/api';

export const postLogin = async ({ surat_tugas = '', username = '', password = '', role_id }) => {
  try {
    const response = await axios.post(
      `${baseURL}/login`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = response;
    return result;
  } catch (error) {
    return error;
  }
};

export const getRolesFromAPI = async () => {
  try {
    const response = await axios.get(`${baseURL}/roles`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.data;
    return result;
  } catch (error) {
    return error;
  }
};

export const postSubmitUser = async ({
  nama = '',
  username = '',
  password = '',
  role_id,
  entitas = '',
  masa_berlaku,
  email = '',
  nip = '',
  golongan = '',
  jabatan = '',
}) => {
  try {
    const response = await axios.post(
      `${baseURL}/register`,
      {
        nama,
        username,
        password,
        role_id,
        entitas,
        masa_berlaku,
        email,
        nip,
        golongan,
        jabatan,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = response;
    return result;
  } catch (error) {
    return error;
  }
};

export const getUsersFromAPI = async () => {
  try {
    const response = await axios.get(`${baseURL}/user/all`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.data;
    return result;
  } catch (error) {
    return error;
  }
};

export const postForm = async ({
  jenis_layanan = '',
  tanggal = '',
  nama = '',
  alamat = '',
  nomorHp = '',
  tujuan = '',
  keterangan = '',
  agama = '',
  tmp_lahir = '',
  tgl_lahir = '',
  pekerjaan = '',
  nm_ayah = '',
  nm_ibu = '',
  jkel = '',
  pewaris = '',
  tanggalMeninggal = '',
  tempatMeninggal = '',
  ahliWaris = '',
  umur = '',
  namaInstansiPengirim = '',
  namaInstansiTujuan = '',
  nomorSurat = '',
  penanggungjawab = '',
  perihal = '',
  namaCalonIstri = '',
  alamatCalonIstri = '',
  tempatLahirCalonIstri = '',
  tanggalLahirCalonIstri = '',
  pekerjaanCalonIstri = '',
  namaCalonSuami = '',
  alamatCalonSuami = '',
  tempatLahirCalonSuami = '',
  tanggalLahirCalonSuami = '',
  pekerjaanCalonSuami = '',
  umurMeninggal = '',
  NIB = '',
  jenisUsaha = '',
  alamatUsaha = '',
}) => {
  try {
    const response = await axios.post(
      `${baseURL}/form`,
      {
        jenis_layanan,
        tanggal,
        nama,
        alamat,
        nomorHp,
        tujuan,
        keterangan,
        agama,
        tmp_lahir,
        tgl_lahir,
        pekerjaan,
        nm_ayah,
        nm_ibu,
        jkel,
        pewaris,
        tanggalMeninggal,
        tempatMeninggal,
        ahliWaris,
        umur,
        namaInstansiPengirim,
        namaInstansiTujuan,
        nomorSurat,
        penanggungjawab,
        perihal,
        namaCalonIstri,
        alamatCalonIstri,
        tempatLahirCalonIstri,
        tanggalLahirCalonIstri,
        pekerjaanCalonIstri,
        namaCalonSuami,
        alamatCalonSuami,
        tempatLahirCalonSuami,
        tanggalLahirCalonSuami,
        pekerjaanCalonSuami,
        umurMeninggal,
        NIB,
        jenisUsaha,
        alamatUsaha,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = response;
    return result;
  } catch (error) {
    return error;
  }
};

export const getAllPermohonan = async () => {
  try {
    const response = await axios.get(`${baseURL}/all/data`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
