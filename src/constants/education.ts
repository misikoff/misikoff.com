type School = {
  id: string
  institution: string
  location: string
  degree: string
  graduationDate: Date //string
}

const dukeMS: School = {
  id: 'duke-ms-statistical-science',
  institution: 'Duke University',
  location: 'Durham, NC',
  degree: 'MS, Statistical Science',
  graduationDate: new Date(), //'May 2024',
}

const utAustinBS: School = {
  id: 'ut-austin-bs-computer-science',
  institution: 'The University of Texas at Austin',
  location: 'Austin, TX',
  degree: 'BS, Computer Science',
  graduationDate: new Date(), //'May 2017',
}

export const schools: School[] = [dukeMS, utAustinBS]
