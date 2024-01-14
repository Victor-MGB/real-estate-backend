
const chats = [
    {
      id: '0',
      message: 'Hey there!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Please write your username',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, how can I help you?',
      trigger: '4',
    },
    {
      id: '4',
      options: [
        { value: 1, label: 'View Houses' },
        { value: 2, label: 'Read Articles' },
      ],
      end: true,
    },
  ];

  
  module.exports = chats;
  