import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfigChat = [
  {
    title: 'chat',
    path: 'chat',
    icon: icon('ic_chat_audit'),
  },
];

export default navConfigChat;
