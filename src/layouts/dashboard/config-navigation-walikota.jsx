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
    title: 'laporan',
    path: '/laporan',
    icon: icon('ic_penugasan'),
  },

  {
    title: 'logout',
    path: 'logout',
    icon: icon('ic_logout'),
  },
];

export default navConfigBPKP;
