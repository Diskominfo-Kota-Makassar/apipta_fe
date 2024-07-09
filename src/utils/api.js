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

export const getAuditFromAPI = async ({ id_penugasan = '' }) => {
  try {
    const response = await axios.get(`${baseURL}/audit_kka/penugasan/${id_penugasan}`, {
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
export const postSubmitAuditKKA = async ({
  file_kesimpulan,
  file_bukti_dukung,
  hasil_pengujian = [],
  id_audit = '',
  tim_ketua = '',
  catatan_review = '',
}) => {
  try {
    const formData = new FormData();
    formData.append('file_kesimpulan', file_kesimpulan);
    formData.append('file_bukti_dukung', file_bukti_dukung);

    if (hasil_pengujian.length !== 0) {
      console.log('null terbaca');
      hasil_pengujian.forEach((file) => {
        formData.append('hasil_pengujian', file);
      });
    }
    formData.append('id_audit', id_audit);
    formData.append('tim_ketua', tim_ketua);
    formData.append('catatan_review', catatan_review);
    const response = await axios.post(`${baseURL}/audit_kka`, formData, {
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
export const putUpdateAuditKKA = async ({
  id_audit = '',
  tim_ketua = '',
  dalnis = '',
  wpj = '',
  bpkp = '',
  obrik = '',
  pj = '',
}) => {
  try {
    if (tim_ketua !== '') {
      const response = await axios.put(
        `${baseURL}/audit_kka/${id_audit}`,
        {
          tim_ketua,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = response;
      return result;
    }
    if (dalnis !== '') {
      const response = await axios.put(
        `${baseURL}/audit_kka/${id_audit}`,
        {
          dalnis,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = response;
      return result;
    }
    if (bpkp !== '') {
      const response = await axios.put(
        `${baseURL}/audit_kka/${id_audit}`,
        {
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
    }
    if (obrik !== '') {
      const response = await axios.put(
        `${baseURL}/audit_kka/${id_audit}`,
        {
          obrik,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = response;
      return result;
    }
    if (pj !== '') {
      const response = await axios.put(
        `${baseURL}/audit_kka/${id_audit}`,
        {
          pj,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response;
      return result;
    }
    if (wpj !== '') {
      const response = await axios.put(
        `${baseURL}/audit_kka/${id_audit}`,
        {
          catatan_wpj: wpj,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response;
      return result;
    }
    return null;
  } catch (error) {
    return error;
  }
};
export const postSubmitAuditKKAAwal = async ({
  no_penugasan = '',
  no_ref_kka = '',
  no_ref_pka = '',
  judul = '',
  tim_anggota = [],
}) => {
  try {
    const response = await axios.post(
      `${baseURL}/audit_kka/awal`,
      {
        no_penugasan,
        no_ref_kka,
        no_ref_pka,
        judul,
        tim_anggota,
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
export const postUpdatePermintaan = async ({ id = '', status = '' }) => {
  try {
    const response = await axios.post(
      `${baseURL}/permintaan/status`,
      {
        id,
        status,
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

export const deletePermintaan = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/permintaan/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = response;
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteAudit = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/audit_kka/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = response;
    return result;
  } catch (error) {
    return error;
  }
};

export const getFileAuditFromAPI = async ({ id_surat_tugas = '' }) => {
  try {
    const response = await axios.get(`${baseURL}/audit_kka/user/file/${id_surat_tugas}`, {
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

export const handlePostFileAudit = async ({ file, user_id = '', penugasan_id = '' }) => {
  try {
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('penugasan_id', penugasan_id);
    formData.append('file', file);
    const response = await axios.post(`${baseURL}/audit_kka/user/file`, formData, {
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

export const handlePostFileAuditBPKP = async ({ file, id_audit = '', bpkp = '' }) => {
  try {
    const formData = new FormData();
    formData.append('id_audit', id_audit);
    formData.append('bpkp', bpkp);
    formData.append('file', file);
    const response = await axios.post(`${baseURL}/audit_kka/bpkp/file`, formData, {
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

// Koompilasi

export const postSubmitKompilasi = async ({
  kondisi = '',
  kriteria = '',
  sebab = '',
  akibat = '',
}) => {
  try {
    const response = await axios.post(
      `${baseURL}/kompilasi`,
      {
        kondisi,
        kriteria,
        sebab,
        akibat,
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
export const postSubmitRekomendasi = async ({ id_kompilasi, masukan = '' }) => {
  try {
    const response = await axios.post(
      `${baseURL}/rekomendasi`,
      {
        id_kompilasi,
        masukan,
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
export const postSubmitRencanaAksi = async ({ id_rekomendasi, masukan = '' }) => {
  try {
    const response = await axios.post(
      `${baseURL}/aksi`,
      {
        id_rekomendasi,
        masukan,
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

export const getKompilasi = async () => {
  try {
    const response = await axios.get(`${baseURL}/kompilasi`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.data;
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteKompilasi = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/kompilasi/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = response;
    return result;
  } catch (error) {
    return error;
  }
};
export const deleteRekomendasi = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/rekomendasi/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = response;
    return result;
  } catch (error) {
    return error;
  }
};
export const deleteAksi = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/aksi/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = response;
    return result;
  } catch (error) {
    return error;
  }
};
