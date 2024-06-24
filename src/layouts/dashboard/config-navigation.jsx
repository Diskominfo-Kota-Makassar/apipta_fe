import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
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
    title: 'audit KKA',
    path: '/audit-kka',
    icon: icon('ic_audit_kka'),
  },
  {
    title: 'kompilasi',
    path: '/kompilasi',
    icon: icon('ic_kompilasi'),
  },
  {
    title: 'master',
    path: 'users',
    icon: icon('ic_master'),
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

export default navConfig;
