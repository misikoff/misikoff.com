'use client'

import { useState } from 'react'

import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Link,
  Font,
  Checkbox,
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

import SortableItem from './SortableItem'

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

// Create Document Component
function MyDocument({
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
}) {
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
                fontSize: 30,
                fontWeight: 500,
                color: colors['text-300'],
                letterSpacing: 8,
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
            {jobs.map((job, index) => (
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
                    | {job.titles.join(' -> ')}{' '}
                    {location && '@ ' + job.location}
                  </Text>

                  <Text style={{ marginLeft: 'auto', marginRight: 0 }}>
                    {toDateFormat(job.startDate)} -{' '}
                    {job.endDate ? toDateFormat(job.endDate) : 'Present'}
                  </Text>
                </View>

                {/* <Text style={{ fontStyle: 'italic' }}>{job.description}</Text> */}
                {job.actions.map((action, index: number) => (
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
            {schools.map((school, index) => (
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
            {awards.map((award, index) => (
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
            {developmentEthos.map((ethos, index) => (
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
export default function ResumeGen() {
  const [activeJobs, setActiveJobs] = useState(
    jobs.map((job) => {
      job.shouldInclude = true
      return job
    }),
  )

  console.log({ activeJobs })

  return (
    <div className=' w-full h-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <div className='h-screen w-full'>
        <h1 className='text-4xl font-bold mb-4'>Resume Generator</h1>
        <div className='flex w-full h-full gap-4 justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>Active Jobs</h2>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(event) => {
                const { active, over } = event
                if (active.id !== over.id) {
                  setActiveJobs((prev) => {
                    const oldIndex = prev.findIndex(
                      (job) => job.id === active.id,
                    )
                    const newIndex = prev.findIndex((job) => job.id === over.id)
                    return arrayMove(prev, oldIndex, newIndex)
                  })
                }
              }}
            >
              <SortableContext
                items={activeJobs}
                strategy={verticalListSortingStrategy}
              >
                <div className='flex flex-col gap-4'>
                  {activeJobs.map((job) => (
                    <SortableItem key={job.id} id={job.id}>
                      <div className='flex items-center w-full justify-between gap-2'>
                        <div>
                          <h3 className='text-xl font-bold'>{job.company}</h3>
                        </div>
                        <input
                          type='checkbox'
                          checked={job.shouldInclude}
                          className='w-5 h-5'
                          onChange={() => {
                            console.log('changing ')
                            setActiveJobs((prev) =>
                              prev.map((j) =>
                                j.id === job.id
                                  ? { ...j, shouldInclude: !j.shouldInclude }
                                  : j,
                              ),
                            )
                          }}
                        />
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
          <PDFViewer
            key={new Date().getTime()}
            className='h-full w-full max-w-4xl'
          >
            <MyDocument
              {...{
                name,
                title,
                phoneNumber,
                email,
                location,
                linkedIn,
                personalWebsite,
                overview,
                jobs: activeJobs.filter((job) => job.shouldInclude),
                schools,
                awards,
                developmentEthos,
              }}
            />
          </PDFViewer>
        </div>
      </div>
    </div>
  )
}
