const withPositions = (items) =>
  items.map((item, index) => ({
    ...item,
    position: `${index + 1} of ${items.length}`,
  }))

export const testimonials = {
  individuals: withPositions([
    {
      text: 'YourBank has been my trusted financial partner for years. Their personalized service and innovative tools have made managing my finances a breeze.',
      name: 'Sara T.',
    },
    {
      text: 'I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.',
      name: 'John D.',
    },
    {
      text: 'I love the convenience of YourBank’s banking app. It allows me to manage my finances and make transactions on the go with ease. The app is user-friendly and secure, giving me peace of mind.',
      name: 'Emily G.',
    },
    {
      text: 'Saving for our first home felt impossible until we opened a savings account here. The clear rates and helpful advisors kept us on track, and we got the keys last spring.',
      name: 'Michael R.',
    },
    {
      text: 'Support always answers quickly and explains things in plain language. When my card was lost abroad, it was blocked and replaced within a day.',
      name: 'Priya S.',
    },
  ]),
  businesses: withPositions([
    {
      text: 'YourBank gave our bakery a business account that just works. Payments reach us on time, and the monthly reports make bookkeeping far easier.',
      name: 'Laura M.',
    },
    {
      text: 'The working capital loan helped us hire two more developers. The approval was fast, and our account manager walked us through every step.',
      name: 'Omar H.',
    },
    {
      text: 'Paying a team across three countries used to take days. With YourBank’s business tools, payroll is done in a few clicks.',
      name: 'Rachel B.',
    },
    {
      text: 'We moved all of our company accounts to YourBank a year ago. The fees are transparent, and the service is as personal as a small bank should be.',
      name: 'Victor P.',
    },
    {
      text: 'Their advisors understood our growth plans and tailored a financing package we could actually afford. We opened our second location in six months.',
      name: 'Anna W.',
    },
  ]),
}
