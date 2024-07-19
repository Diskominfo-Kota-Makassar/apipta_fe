import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfigBPKP = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'penugasan',
    path: '/penugasan',
    icon: icon('ic_penugasan'),
  },
  {
    title: 'permintaan',
    path: '/permintaan',
    icon: icon('ic_permintaan'),
  },
  {
    title: 'Pengujian',
    path: '/audit-kka',
    icon: icon('ic_audit_kka'),
  },

  {
    title: 'simakda',
    path: '/simakda',
    icon: icon('ic_simakda'),
  },
  {
    title: 'logout',
    path: 'logout',
    icon: icon('ic_logout'),
  },
];

export default navConfigBPKP;
