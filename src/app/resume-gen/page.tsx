'use client'

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Link,
} from '@react-pdf/renderer'

import { awards } from '@/constants/awards'
import { schools } from '@/constants/education'
import { developmentEthos } from '@/constants/ethos'
import {
  overview,
  name,
  phoneNumber,
  title,
  location,
  email,
  linkedIn,
  personalWebsite,
} from '@/constants/misc'
import { stackComponents } from '@/constants/stack'
import { jobs } from '@/constants/workExperience'
const Divider = ({
  thickness = 1,
  color = '#333',
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
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    // flexGrow: 1,
  },
  award: {
    marginBottom: 5,
    fontSize: 12,
  },
  schools: {
    marginBottom: 5,
    fontSize: 12,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
})

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size='A4' style={styles.page}>
      {/* section for overview with name, title, etc */}
      <View style={styles.section}>
        <Text style={{ fontSize: 24, fontWeight: 900 }}>{name}</Text>
        <Text style={{ fontSize: 16, fontWeight: 900 }}>{title}</Text>
        <Divider />

        <Text style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>
            {phoneNumber} | {email} | {location} |
            <Link href={linkedIn}>{linkedIn.replace('https://www.', '')}</Link>|{' '}
            <Link href={personalWebsite}>
              {personalWebsite.replace('https://', '')}
            </Link>
          </Text>
        </Text>
      </View>
      <Divider />
      <View style={styles.section}>
        <Text>Professional Overview</Text>
        <Text style={{ margin: 10, fontSize: 12 }}>{overview}</Text>
        <Divider />
      </View>

      {/* work experience section. loop over jobs and actions */}
      <View style={styles.section}>
        <Text>Work Experience</Text>
        {jobs.map((job, index) => (
          <View
            key={index}
            style={{
              marginBottom: 10,
              // backgroundColor: 'red'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // flexGrow: 1,
                // width: '100%',
                // backgroundColor: 'blue',
                fontSize: 12,
              }}
            >
              <Text>
                <Text style={{ fontWeight: 700 }}>{job.company}</Text> |{' '}
                {job.titles.join(' -> ')} {location && '@ ' + job.location}
              </Text>

              <Text style={{ marginLeft: 'auto', marginRight: 0 }}>
                {job.startDate.toLocaleDateString()} -{' '}
                {job.endDate ? job.endDate.toLocaleDateString() : 'Present'}
              </Text>
            </View>

            <Text style={{ fontStyle: 'italic' }}>{job.description}</Text>
            {job.actions.map((action, index) => (
              <Text key={index} style={styles.textRow}>
                <Text>{action.text}</Text>
                {/* {action.stack && (
                  <Text style={{ fontStyle: 'italic' }}>
                    {action.stack.join(', ')}
                  </Text>
                )} */}
              </Text>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text>Education</Text>
        {schools.map((school, index) => (
          <Text key={index} style={styles.award}>
            {school.institution} - {school.degree} -{' '}
            {school.graduationDate.toLocaleDateString()}
            {school.location && ` - ${school.location}`}
          </Text>
        ))}
      </View>
      <Divider />
      <View style={styles.section}>
        <Text>Awards</Text>
        {awards.map((award, index) => (
          <Text key={index} style={styles.award}>
            {award.title} - {award.date.toLocaleDateString()}
            {award.description && ` - ${award.description}`}
          </Text>
        ))}
      </View>
      <Divider />

      <View style={styles.section}>
        <Text>Tech Stack</Text>
        {stackComponents.map((stackComponent, index) => (
          <Text key={index} style={styles.textRow}>
            <Text style={{ fontWeight: 900 }}>{stackComponent.category}</Text>-{' '}
            {stackComponent.technologies.join(', ')}
          </Text>
        ))}
      </View>
      <Divider />

      <View style={styles.section}>
        <Text>Development Ethos</Text>
        {developmentEthos.map((ethos, index) => (
          <Text key={index} style={styles.award}>
            {ethos.principle} | {ethos.description}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
)
export default function ResumeGen() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start text-center max-w-4xl h-full'>
        <h1 className='text-4xl font-bold'>Resume Generator</h1>
        <PDFViewer className='h-full w-full max-w-4xl'>
          <MyDocument />
        </PDFViewer>
      </main>
    </div>
  )
}
