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

import { stackComponents } from './constants/stack'

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
}: any) {
  return (
    <Document
      title='Tommy Misikoff Resume'
      author='Tommy Misikoff'
      subject='Software Engineer Resume'
      keywords='resume, frontend, fullstack, React, Next.js'
      creator='Tommy Misikoff'
    >
      <Page size='A4' style={styles.page}>
        {/* section for overview with name, title, etc */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
          </View>
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

          <Divider />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text>
              {phoneNumber} | {email} | {location} |{' '}
              <Link href={linkedIn} style={{ color: colors['text-100'] }}>
                {linkedIn.replace('https://www.', '')}
              </Link>{' '}
              |{' '}
              <Link
                href={personalWebsite}
                style={{ color: colors['text-100'] }}
              >
                {personalWebsite.replace('https://', '')}
              </Link>
            </Text>
          </View>
        </View>

        {overview && (
          <View style={styles.section}>
            <Divider />
            <Text style={styles.sectionTitle}>Professional Overview</Text>
            <Text style={{ lineHeight: 0.8 }}>{overview}</Text>
          </View>
        )}

        {/* work experience section. loop over jobs and actions */}
        {jobs.length > 0 && (
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
                    <Text
                      style={{ fontWeight: 700, color: colors['text-300'] }}
                    >
                      {job.company}
                    </Text>{' '}
                    {job.bonusDescriptor && (
                      <>
                        <Text style={{ color: colors['text-300'] }}>
                          ({job.bonusDescriptor})
                        </Text>{' '}
                      </>
                    )}
                    | {job.titles.slice().reverse().join(' << ')}
                    {location && ' @ ' + job.location}
                  </Text>

                  <Text style={{ marginLeft: 'auto', marginRight: 0 }}>
                    {toDateFormat(job.startDate)} -{' '}
                    {job.endDate ? toDateFormat(job.endDate) : 'Present'}
                  </Text>
                </View>

                {/* <Text style={{ fontStyle: 'italic' }}>{job.description}</Text> */}
                {job.actions.map((action: any, index: number) => (
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
        )}

        {schools.length > 0 && (
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
                  {school.institution} | {school.degree} | {school.location}
                </Text>
                <Text>{toDateFormat(school.graduationDate)}</Text>
              </View>
            ))}
          </View>
        )}

        {awards.length > 0 && (
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
                <Text> {toDateFormat(award.date)}</Text>
                {/* {award.location && ` - ${award.location}`} */}
                {/* {award.company && ` - ${award.company}`} */}
                {/* {award.description && ` - ${award.description}`} */}
              </View>
            ))}
          </View>
        )}

        {stackComponents.length > 0 && (
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
        )}

        {developmentEthos.length > 0 && (
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
        )}
      </Page>
    </Document>
  )
}
