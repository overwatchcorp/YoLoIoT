module.exports = {
  pubKey: '9C7QeifqyC3pse855R5bj0R13q0icOsWAwPoKTqOUuQ=',
  secretKey: '9BGJhAVkTMQsQryztIfAYyAy2GcFQMxE4SY/5TLfAYX0LtB6J+rILemx7znlHluPRHXerSJw6xYDA+gpOo5S5A==',
  testPayload: {
    payload: {
      data: {
        temp: 22.2,
        humidity: 45.8,
      },
      clientID: 'XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT',
      createdAt: 1494476786888,
    },
    sig: 'sGU9+E5tHECk0MLS4KrOGJdfjgPTT5z9nC/SzV4xCz3l67x4/IxAbrFSR0vl0DEb753GDjkL7dxCbMDS50BhDw==',
  },
  testPayloadWithBadSig: {
    payload: {
      data: {
        temp: 22.2,
        humidity: 45.8,
      },
      clientID: 'XwPp9xazJ0ku5CZnlmgAx2Dld8SHkAeT',
      createdAt: 1494476786888,
    },
    sig: 'Gl6/q6mwaYHGAmrzvJF4tbsS5X68EBb/K0orb62Zl4WItSQyMyvB6AWibp/dAyDqJKuQ8hEycHA6/xLjOqoHAg==',
  },
}
