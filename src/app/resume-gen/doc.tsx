'use client'

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Font,
} from '@react-pdf/renderer'

Font.register({
  family: 'Lora',
  src: 'Lora-VariableFont_wght.ttf',
})

// const hyphenationCallback = (word) => {
//   // Return word syllables in an array
//   return word
// }

// Font.registerHyphenationCallback(hyphenationCallback)

Font.registerHyphenationCallback((word) => {
  // const middle = Math.floor(word.length / 2)
  // const parts =
  //   word.length === 1 ? [word] : [word.substr(0, middle), word.substr(middle)]

  // // Check console to see words parts
  // console.log(word, parts)

  // return parts
  return [word]
})

function toDateFormat(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

const colors = {
  'text-50': '#bfbfbf',
  'text-100': '#808080',
  'text-200': '#626262',
  'text-300': '#595959',
}

const Divider = ({
  thickness = 1,
  color = colors['text-50'],
  width = '100%',
  margin = 8,
}) => (
  <View
    style={{
      width,
      height: thickness,
      backgroundColor: color,
      marginVertical: margin,
    }}
  />
)

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    flexDirection: 'column',
    // backgroundColor: '#E4E4E4',
    padding: 20,
    color: colors['text-100'],
  },
  section: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 11,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginTop: 5,
    marginBottom: 10,
    color: '#626262',
    letterSpacing: 1,
  },
  award: {
    // marginBottom: 5,
    lineHeight: 0.8,
    // fontSize: 12,
  },
  schools: {
    marginBottom: 5,
    // fontSize: 12,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    lineHeight: 0.8,
  },
})

function OverviewSection({ overview }: { overview?: string }) {
  if (!overview) {
    return null
  }
  return (
    <View style={styles.section}>
      <Divider />
      <Text style={styles.sectionTitle}>Professional Overview</Text>
      <Text style={{ lineHeight: 0.8 }}>{overview}</Text>
    </View>
  )
}

function JobsSection({ jobs }: { jobs?: any[] }) {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return null
  }
  return (
    <View style={styles.section}>
      <Divider />
      <Text style={styles.sectionTitle}>Work Experience</Text>
      {jobs.map((job: any, index: number) => (
        <View
          key={index}
          style={{
            marginBottom: 10,
          }}
          wrap={false}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}
          >
            <Text>
              {job.company && (
                <Text style={{ fontWeight: 700, color: colors['text-300'] }}>
                  {job.company}
                </Text>
              )}
              {job.bonusDescriptor && (
                <>
                  <Text style={{ color: colors['text-300'] }}>
                    {' '}
                    ({job.bonusDescriptor})
                  </Text>{' '}
                </>
              )}
              {(job.company || job.bonusDescriptor) && ' | '}
              {Array.isArray(job.titles) &&
                job.titles.length > 0 &&
                job.titles.slice().reverse().join(' << ')}
              {job.location && ' @ ' + job.location}
            </Text>

            {(job.startDate || job.endDate) && (
              <Text style={{ marginLeft: 'auto', marginRight: 0 }}>
                {job.startDate && toDateFormat(job.startDate)} -{' '}
                {job.endDate
                  ? toDateFormat(job.endDate)
                  : job.startDate
                    ? 'Present'
                    : ''}
              </Text>
            )}
          </View>

          {Array.isArray(job.actions) &&
            job.actions.map((action: any, index: number) => (
              <View
                key={index}
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  lineHeight: 0.8,
                }}
              >
                <Text style={{ marginLeft: 9, marginRight: 9 }}>•</Text>
                <Text
                  style={{
                    ...styles.textRow,
                    maxWidth: '95%',
                  }}
                >
                  {action.text}
                </Text>
              </View>
            ))}
        </View>
      ))}
    </View>
  )
}

function SchoolsSection({ schools }: { schools?: any[] }) {
  if (!Array.isArray(schools) || schools.length === 0) {
    return null
  }
  return (
    <View style={styles.section} wrap={false}>
      <Divider />
      <Text style={styles.sectionTitle}>Education</Text>
      {schools.map((school: any, index: number) => (
        <View
          key={index}
          style={{
            ...styles.award,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text>
            {school.institution && school.institution}
            {school.degree && ` | ${school.degree}`}
            {school.location && ` | ${school.location}`}
          </Text>
          {school.graduationDate && (
            <Text>{toDateFormat(school.graduationDate)}</Text>
          )}
        </View>
      ))}
    </View>
  )
}

function AwardsSection({ awards }: { awards?: any[] }) {
  if (!Array.isArray(awards) || awards.length > 3) {
    return null
  }
  return (
    <View style={styles.section} wrap={false}>
      <Divider />
      <Text style={styles.sectionTitle}>Awards</Text>
      {awards.map((award: any, index: number) => (
        <View
          key={index}
          style={{
            ...styles.award,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text>{award.title}</Text>
          {award.date && <Text> {toDateFormat(award.date)}</Text>}
        </View>
      ))}
    </View>
  )
}

function TechStackSection({ stackComponents }: { stackComponents?: any[] }) {
  if (!Array.isArray(stackComponents) || stackComponents.length === 0) {
    return null
  }
  return (
    <View style={styles.section} wrap={false}>
      <Divider />
      <Text style={styles.sectionTitle}>Tech Stack</Text>
      {stackComponents.map((stackComponent, index) => (
        <Text key={index} style={styles.textRow}>
          <Text style={{ fontWeight: 700, color: colors['text-300'] }}>
            {stackComponent.category}
          </Text>{' '}
          | {stackComponent.technologies.join(', ')}
        </Text>
      ))}
    </View>
  )
}

function EthosSection({ developmentEthos }: { developmentEthos?: any[] }) {
  if (!Array.isArray(developmentEthos) || developmentEthos.length === 0) {
    return null
  }
  return (
    <View style={styles.section} wrap={false}>
      <Divider />
      <Text style={styles.sectionTitle}>Development Ethos</Text>
      {developmentEthos.map((ethos: any, index: number) => (
        <Text key={index} style={styles.award}>
          <Text style={{ fontWeight: 700, color: colors['text-300'] }}>
            {ethos.principle}
          </Text>{' '}
          | {ethos.description}
        </Text>
      ))}
    </View>
  )
}

const SECTION_COMPONENTS: Record<
  string,
  (props: any) => React.JSX.Element | null
> = {
  overview: OverviewSection,
  jobs: JobsSection,
  schools: SchoolsSection,
  awards: AwardsSection,
  stackComponents: TechStackSection,
  developmentEthos: EthosSection,
}

export default function MyDocument({
  name,
  title,
  phoneNumber,
  email,
  location,
  linkedIn,
  personalWebsite,
  overview,
  jobs,
  schools,
  awards,
  developmentEthos,
  stackComponents,
  sectionOrder = [
    'overview',
    'jobs',
    'schools',
    'awards',
    'stackComponents',
    'developmentEthos',
  ],
}: any) {
  const sectionProps: { [key: string]: any } = {
    overview,
    jobs,
    schools,
    awards,
    stackComponents,
    developmentEthos,
  }

  return (
    <Document
      title={name + ' Resume'}
      author={name}
      subject={title + ' Resume'}
      creator={name}
    >
      <Page size='A4' style={styles.page}>
        {/* section for overview with name, title, etc */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {name && (
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: colors['text-300'],
                  letterSpacing: 6,
                  fontFamily: 'Lora',
                }}
              >
                {name}
              </Text>
            )}
          </View>
          {title && (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: 4,
                  marginTop: 5,
                  marginBottom: 12,
                }}
              >
                {title}
              </Text>
            </View>
          )}

          <Divider />
          {(phoneNumber ||
            email ||
            location ||
            linkedIn ||
            personalWebsite) && (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text>
                {phoneNumber && `${phoneNumber} | `}
                {email && `${email} | `}
                {location && `${location} | `}
                {linkedIn && (
                  <>
                    <Link href={linkedIn} style={{ color: colors['text-100'] }}>
                      {linkedIn.replace('https://www.', '')}
                    </Link>
                    {' | '}
                  </>
                )}
                {personalWebsite && (
                  <Link
                    href={personalWebsite}
                    style={{ color: colors['text-100'] }}
                  >
                    {personalWebsite.replace('https://', '')}
                  </Link>
                )}
              </Text>
            </View>
          )}
        </View>

        {sectionOrder.map((key: string) => {
          const Section = SECTION_COMPONENTS[key]
          return Section ? (
            <Section key={key} {...{ [key]: sectionProps[key] }} />
          ) : null
        })}
      </Page>
    </Document>
  )
}
