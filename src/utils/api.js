import axios from 'axios';

// const baseURL = 'http://localhost:3200/api';
export const baseURL = 'https://apipta.makassarkota.go.id/api';

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

export const postSubmitPenugasan = async ({
  no = '',
  tgl = '',
  uraian = '',
  tgl_mulai = '',
  tgl_berakhir = '',
  pj_id = '',
  wpj_id = '',
  dalnis_id = '',
  tim_id = [],
  kt_id = '',
  bpkp = '',
}) => {
  try {
    const response = await axios.post(
      `${baseURL}/penugasan`,
      {
        no,
        tgl,
        uraian,
        tgl_mulai,
        tgl_berakhir,
        pj_id,
        wpj_id,
        dalnis_id,
        tim_id,
        kt_id,
        bpkp,
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
export const postSubmitPermintaan = async ({
  file,
  no = '',
  tgl_penugasan = '',
  uraian = '',
  no_ref_kka = '',
  no_ref_pka = '',
  judul_doc = '',
  ket = '',
}) => {
  try {
    console.log(no);
    console.log(tgl_penugasan);
    console.log(uraian);
    console.log(no_ref_kka);
    console.log(no_ref_pka);
    console.log(judul_doc);
    console.log(ket);
    console.log(file);
    // Create a FormData object
    const formData = new FormData();
    formData.append('file', file);
    formData.append('no', no);
    formData.append('tgl_penugasan', tgl_penugasan);
    formData.append('uraian', uraian);
    formData.append('no_ref_kka', no_ref_kka);
    formData.append('no_ref_pka', no_ref_pka);
    formData.append('judul_doc', judul_doc);
    formData.append('ket', ket);
    const response = await axios.post(`${baseURL}/permintaan`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

export const getPenugasanFromAPI = async () => {
  try {
    const response = await axios.get(`${baseURL}/penugasan`, {
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
export const getPermintaanFromAPI = async () => {
  try {
    const response = await axios.get(`${baseURL}/permintaan`, {
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

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response;
    return result;
  } catch (error) {
    return error;
  }
};

export const deletePenugasan = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/penugasan/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response;
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
