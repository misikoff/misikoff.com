type Award = {
  id: string
  title: string
  date: Date
  description?: string
}

const dukeQuantFinanceCompetition: Award = {
  id: 'duke-quant-finance-2024',
  title: '1st Place: Duke Quantitative Finance Competition',
  date: new Date('04/01/2024'), //'Apr 2024',
}

const cantBeEvilTwilio: Award = {
  id: 'cant-be-evil-twilio-2020',
  title: "1st Place: Can't Be Evil Contest Part 3 - Best Use of Twilio",
  date: new Date('01/01/2020'), //'Jan 2020',
}

export const awards: Award[] = [dukeQuantFinanceCompetition, cantBeEvilTwilio]
