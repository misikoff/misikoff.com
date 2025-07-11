'use client'

import { useEffect, useState } from 'react'

import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'

import { awards } from '@/app/resume-gen/constants/awards'
import { schools } from '@/app/resume-gen/constants/education'
import { developmentEthos } from '@/app/resume-gen/constants/ethos'
import { jobs } from '@/app/resume-gen/constants/experience'
import {
  overview,
  name,
  phoneNumber,
  titles,
  location,
  email,
  linkedIn,
  personalWebsite,
} from '@/app/resume-gen/constants/misc'
import { stackComponents } from '@/app/resume-gen/constants/stack'

import SortableItem from './SortableItem'
import MyDocument from './doc'
import { createAIRequest } from './request'

const DEFAULT_SECTION_ORDER = [
  'overview',
  'jobs',
  'schools',
  'awards',
  'stackComponents',
  'developmentEthos',
]

const SECTION_LABELS: Record<string, string> = {
  overview: 'Overview',
  jobs: 'Jobs',
  schools: 'Schools',
  awards: 'Awards',
  stackComponents: 'Tech Stack',
  developmentEthos: 'Development Ethos',
}

// for each job in jobs, add a unique id for each action
const jobsWithIds = jobs.map((job) => {
  job.actions.forEach((action, idx) => {
    // if action.id is not defined, set it to a unique id
    if (!action.id) {
      action.id = `${job.id}-action-${idx}` as any
    }
  })
  return job
})

console.log({ jobsWithIds })

function SectionOrderItem({
  id,
  checked,
  onToggle,
}: {
  id: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <div className='px-3 py-2 rounded bg-stone-100 border flex items-center justify-between cursor-move'>
      <span className='font-medium'>{SECTION_LABELS[id] || id}</span>
      <input
        type='checkbox'
        checked={checked}
        onChange={onToggle}
        className='w-4 h-4 ml-4'
      />
    </div>
  )
}

function getFileName(name: string, company?: string) {
  let filename = 'Resume.pdf'
  if (company) {
    filename = `${company.replaceAll(' ', '')}-${filename}`
  }
  if (name) {
    // get initials from name
    const initials = name
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .join('')
    filename = `${initials}-${filename}`
    // filename = `${name.replaceAll(' ', '')}-${filename}`
  }
  return filename
}

export default function ResumeGen() {
  console.log({ test: createAIRequest() })

  const [mounted, setMounted] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState(titles[0] || '')

  useEffect(() => {
    setMounted(true)
  }, [])

  const [curCompany, setCurCompany] = useState('')
  // const [jobLink, setCurJobLink] = useState('')
  const [activeJobs, setActiveJobs] = useState(
    jobsWithIds.map((job) => ({
      ...job,
      shouldInclude: true,
      actions: job.actions.map((action, idx) => ({
        ...action,
        shouldInclude: true,
        id: action.id, //?? `${job.id}-action-${action.text}`, // fallback id
      })),
    })),
  )

  const onActionDragEnd = (jobId: string, event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) {
      return
    }

    setActiveJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              actions: arrayMove(
                job.actions,
                job.actions.findIndex((a) => a.id === active.id),
                job.actions.findIndex((a) => a.id === over.id),
              ),
            }
          : job,
      ),
    )
  }

  console.log({ activeJobs })

  const [expandedJobs, setExpandedJobs] = useState<string[]>([])

  const toggleExpand = (jobId: string) => {
    setExpandedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    )
  }

  // Toggle action inclusion
  const toggleAction = (jobId: string, actionIdx: number) => {
    setActiveJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              actions: job.actions.map((action, idx) =>
                idx === actionIdx
                  ? { ...action, shouldInclude: !action.shouldInclude }
                  : action,
              ),
            }
          : job,
      ),
    )
  }

  const [includeOverview, setIncludeOverview] = useState(true)
  const [includeJobs, setIncludeJobs] = useState(true)
  const [includeSchools, setIncludeSchools] = useState(true)
  const [includeAwards, setIncludeAwards] = useState(true)
  const [includeDevelopmentEthos, setIncludeDevelopmentEthos] = useState(true)
  const [includeStackComponents, setIncludeStackComponents] = useState(true)
  const [sectionOrder, setSectionOrder] = useState(DEFAULT_SECTION_ORDER)

  // Map section keys to their toggle state and setter
  const sectionToggles: Record<
    string,
    { checked: boolean; setChecked: (v: boolean) => void }
  > = {
    overview: { checked: includeOverview, setChecked: setIncludeOverview },
    jobs: { checked: includeJobs, setChecked: setIncludeJobs },
    schools: { checked: includeSchools, setChecked: setIncludeSchools },
    awards: { checked: includeAwards, setChecked: setIncludeAwards },
    developmentEthos: {
      checked: includeDevelopmentEthos,
      setChecked: setIncludeDevelopmentEthos,
    },
    stackComponents: {
      checked: includeStackComponents,
      setChecked: setIncludeStackComponents,
    },
  }

  const myDocArgs = {
    name,
    title: selectedTitle,
    phoneNumber,
    email,
    location,
    linkedIn,
    personalWebsite,
    overview: includeOverview ? overview : undefined,
    jobs: includeJobs
      ? activeJobs
          .filter((job) => job.shouldInclude)
          .map((job) => ({
            ...job,
            actions: job.actions.filter((action) => action.shouldInclude),
          }))
      : undefined,
    schools: includeSchools ? schools : undefined,
    awards: includeAwards ? awards : undefined,
    developmentEthos: includeDevelopmentEthos ? developmentEthos : undefined,
    stackComponents: includeStackComponents ? stackComponents : undefined,
    sectionOrder,
  }

  // Section order drag handler
  const onSectionOrderDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) {
      return
    }
    setSectionOrder((prev) => {
      const oldIndex = prev.indexOf(active.id)
      const newIndex = prev.indexOf(over.id)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  return (
    <div className='w-full h-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <div className='w-full'>
        <h1 className='text-4xl text-center font-bold mb-4'>
          Resume Generator
        </h1>

        <div className='flex w-full h-full gap-6 justify-center'>
          <div className='flex flex-col w-full max-w-2xl gap-4'>
            <div className='mb-4'>
              <label htmlFor='title' className='mr-2 font-semibold'>
                Title:
              </label>
              <select
                id='title'
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
                className='border rounded px-2 py-1'
              >
                {titles.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-4'>
              <label htmlFor='curCompany' className='mr-2 font-semibold'>
                Target Company:
              </label>
              <input
                id='curCompany'
                type='text'
                value={curCompany}
                onChange={(e) => setCurCompany(e.target.value)}
                className='border rounded px-2 py-1'
                placeholder='Enter the target company'
              />
            </div>
            {/* <label htmlFor='jobLink' className='mr-2 font-semibold'>
              job link
            </label>
            <input
              id='jobLink'
              type='text'
              value={jobLink}
              onChange={(e) => setCurJobLink(e.target.value)}
              className='border rounded px-2 py-1'
              placeholder='Enter the job posting link'
            /> */}

            {/* <button
              onClick={async () => {
                // curl the job link and return the body
                const res = await fetch(`https://corsproxy.io/?url=${jobLink}`)
                console.log({ res })
                // read body and log it
                const body = await res.text() // Read the response body as text
                console.log({ body })
                // remove all svgs
                const parser = new DOMParser()
                const doc = parser.parseFromString(body, 'text/html')
                doc.querySelectorAll('svg').forEach((svg) => {
                  svg.remove()
                })
                // remove all script tags
                doc.querySelectorAll('script').forEach((script) => {
                  script.remove()
                })
                // remove all style tags
                doc.querySelectorAll('style').forEach((style) => {
                  style.remove()
                })
                // remove all meta tags
                doc.querySelectorAll('meta').forEach((meta) => {
                  meta.remove()
                })
                // remove all classes
                doc.querySelectorAll('*').forEach((el) => {
                  // el.removeAttribute('class')
                  // el.removeAttribute('style')
                  // el.removeAttribute('id')
                  Array.from(el.attributes).forEach((attr) =>
                    el.removeAttribute(attr.name),
                  )
                })

                // remove empty elements
                doc.querySelectorAll('*:empty').forEach((el) => {
                  el.remove()
                })
                doc.querySelectorAll('*:empty').forEach((el) => {
                  el.remove()
                })
                doc.querySelectorAll('*:empty').forEach((el) => {
                  el.remove()
                })
                doc.querySelectorAll('*:empty').forEach((el) => {
                  el.remove()
                })
                doc.querySelectorAll('*:empty').forEach((el) => {
                  el.remove()
                })

                // remove all comments
                doc.querySelectorAll('*').forEach((el) => {
                  if (el.nodeType === Node.COMMENT_NODE) {
                    el.remove()
                  }
                })
                const parsedBody = doc.body.innerHTML
                console.log({ parsedBody })
              }}
            >
              fetch posting
            </button> */}

            <h2 className='text-2xl font-bold'>Active Jobs</h2>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={(event) => {
                const { active, over } = event
                if (active.id !== over?.id) {
                  setActiveJobs((prev) => {
                    const oldIndex = prev.findIndex(
                      (job) => job.id === active.id,
                    )
                    const newIndex = prev.findIndex(
                      (job) => job.id === over?.id,
                    )
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
                      <div className='flex flex-col w-full gap-1 border rounded p-2'>
                        <div className='flex items-center w-full justify-between gap-2'>
                          <div className='flex items-center gap-2'>
                            <button
                              type='button'
                              aria-label={
                                expandedJobs.includes(job.id)
                                  ? 'Collapse'
                                  : 'Expand'
                              }
                              onClick={() => toggleExpand(job.id)}
                              className='text-lg px-2'
                            >
                              {expandedJobs.includes(job.id) ? '▼' : '▶'}
                            </button>
                            <h3 className='text-xl font-bold'>{job.company}</h3>
                          </div>
                          <input
                            type='checkbox'
                            checked={job.shouldInclude}
                            className='w-5 h-5'
                            onChange={() => {
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
                        {expandedJobs.includes(job.id) && (
                          <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={(event) =>
                              onActionDragEnd(job.id, event)
                            }
                          >
                            <SortableContext
                              items={job.actions
                                .map((action) => action.id)
                                .filter((id) => id !== undefined)}
                              strategy={verticalListSortingStrategy}
                            >
                              <ul className='pl-8 list-disc text-sm'>
                                {job.actions.map((action, idx) => (
                                  <SortableItem key={action.id} id={action.id}>
                                    <li className='flex items-center w-full justify-between gap-2'>
                                      <span>{action.text}</span>
                                      <input
                                        type='checkbox'
                                        checked={action.shouldInclude}
                                        onChange={() =>
                                          toggleAction(job.id, idx)
                                        }
                                        className='w-4 h-4'
                                      />
                                    </li>
                                  </SortableItem>
                                ))}
                              </ul>
                            </SortableContext>
                          </DndContext>
                        )}
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* Section Order with Toggles */}
            <div className='mb-6'>
              <h2 className='font-semibold mb-2'>Section Order</h2>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onSectionOrderDragEnd}
              >
                <SortableContext
                  items={sectionOrder}
                  strategy={verticalListSortingStrategy}
                >
                  <div className='flex flex-col gap-2'>
                    {sectionOrder.map((section) => (
                      <SortableItem key={section} id={section}>
                        <SectionOrderItem
                          id={section}
                          checked={sectionToggles[section]?.checked}
                          onToggle={() =>
                            sectionToggles[section]?.setChecked(
                              !sectionToggles[section].checked,
                            )
                          }
                        />
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>
          {mounted && (
            <div className='w-full max-w-4xl flex flex-col gap-4'>
              <div className='bg-blue-700 shadow-2xl text-white text-lg flex w-fit rounded-md px-3 py-2'>
                <PDFDownloadLink
                  key={new Date().getTime()}
                  document={<MyDocument {...myDocArgs} />}
                  fileName={getFileName(name, curCompany)}
                >
                  {({ loading }) =>
                    loading ? (
                      'Loading document...'
                    ) : (
                      <>
                        Download Resume as{' '}
                        <span className='font-mono'>
                          {getFileName(name, curCompany)}
                        </span>
                      </>
                    )
                  }
                </PDFDownloadLink>
              </div>

              <PDFViewer
                key={new Date().getTime()}
                className='min-h-screen w-full'
              >
                <MyDocument {...myDocArgs} />
              </PDFViewer>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
