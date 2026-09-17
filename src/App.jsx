import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom'

import { useState, useEffect } from 'react'

import Navbar from './components/Navbar'
import './App.css'

import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminUpload from './pages/AdminUpload'



/* =========================================================
   API
========================================================= */

const API_BASE_URL = 'http://localhost:5000'


/* =========================================================
   HOME PAGE
========================================================= */

function Home() {

  const services = [
    {
      icon: '📊',
      number: '01',
      title: 'Data Analytics',
      description:
        'Analyze business and operational data to discover patterns, trends, and actionable insights.',
    },
    {
      icon: '📈',
      number: '02',
      title: 'Data Visualization',
      description:
        'Turn complex datasets into clear, engaging charts, dashboards, and visual stories.',
    },
    {
      icon: '📑',
      number: '03',
      title: 'Power BI',
      description:
        'Build interactive Power BI dashboards that make business performance easier to understand.',
    },
    {
      icon: '🧹',
      number: '04',
      title: 'Data Cleaning',
      description:
        'Clean, organize, and prepare raw data so it becomes reliable and ready for analysis.',
    },
    {
      icon: '🤖',
      number: '05',
      title: 'Machine Learning',
      description:
        'Use machine learning techniques to discover patterns and build useful predictive solutions.',
    },
  ]

  return (
    <div className="home-page">

      {/* HERO */}

      <section className="hero">

        <div className="container hero-container">

          <div className="hero-content">

            <div className="hero-badge">
              <span>✦</span>
              Data Analytics & Learning Platform
            </div>

            <h1>
              Turn Data Into
              <span> Better Decisions.</span>
            </h1>

            <p className="hero-subtitle">
              See Your Data. Make Better Decisions.
            </p>

            <p className="hero-description">
              Transform raw data into meaningful insights, powerful
              visualizations, and smarter decisions. Learn data analytics
              step by step or explore professional data solutions with
              DataVista.
            </p>

            <div className="hero-buttons">

              <Link
                to="/free-notes"
                className="btn btn-primary"
              >
                Explore Free Notes →
              </Link>

              <Link
                to="/services"
                className="btn btn-secondary"
              >
                Explore Services
              </Link>

            </div>

          </div>


          <div className="hero-visual">

            <div className="analytics-card">

              <div className="analytics-header">

                <div>

                  <span className="small-label">
                    Analytics Overview
                  </span>

                  <h3>
                    Business Insights
                  </h3>

                </div>

                <span className="live-badge">
                  <span></span>
                  Live Data
                </span>

              </div>


              <div className="chart-area">

                <div className="chart-bars">

                  <span style={{ height: '35%' }}></span>
                  <span style={{ height: '48%' }}></span>
                  <span style={{ height: '42%' }}></span>
                  <span style={{ height: '65%' }}></span>
                  <span style={{ height: '58%' }}></span>
                  <span style={{ height: '78%' }}></span>
                  <span style={{ height: '88%' }}></span>

                </div>

              </div>


              <div className="analytics-stats">

                <div>
                  <strong>9+</strong>
                  <span>Learning Topics</span>
                </div>

                <div>
                  <strong>9</strong>
                  <span>Services</span>
                </div>

                <div>
                  <strong>7+</strong>
                  <span>Projects</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* WHY DATAVISTA */}

      <section className="section why-section">

        <div className="container">

          <div className="section-heading">

            <span className="section-label">
              WHY DATAVISTA?
            </span>

            <h2>
              Data Made Simple.
              <span> Decisions Made Smarter.</span>
            </h2>

            <p>
              DataVista helps students, beginners, and businesses understand
              data and turn it into useful insights.
            </p>

          </div>


          <div className="why-grid">

            <div className="why-card">

              <div className="why-icon">
                📊
              </div>

              <h3>
                Analyze
              </h3>

              <p>
                Understand your data, identify patterns, and discover
                meaningful insights.
              </p>

            </div>


            <div className="why-card">

              <div className="why-icon">
                📈
              </div>

              <h3>
                Visualize
              </h3>

              <p>
                Convert complex information into clear dashboards and
                powerful visualizations.
              </p>

            </div>


            <div className="why-card">

              <div className="why-icon">
                💡
              </div>

              <h3>
                Decide
              </h3>

              <p>
                Use data-driven insights to make smarter and more confident
                decisions.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* SERVICES PREVIEW */}

      <section className="section services-preview">

        <div className="container">

          <div className="section-heading section-heading-row">

            <div>

              <span className="section-label">
                WHAT WE DO
              </span>

              <h2>
                Powerful Data Solutions
                <span> For Smarter Decisions</span>
              </h2>

              <p>
                From raw data to meaningful insights, DataVista helps
                transform information into something useful and actionable.
              </p>

            </div>

            <Link
              to="/services"
              className="text-link"
            >
              View All Services →
            </Link>

          </div>


          <div className="services-grid">

            {services.map((service) => (

              <div
                className="service-card"
                key={service.number}
              >

                <div className="service-card-top">

                  <div className="service-icon">
                    {service.icon}
                  </div>

                  <span className="service-number">
                    {service.number}
                  </span>

                </div>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

                <Link
                  to="/services"
                  className="service-link"
                >
                  Explore Service →
                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* LEARNING CTA */}

      <section className="section learning-home-section">

        <div className="container">

          <div className="learning-home-card">

            <div>

              <span className="section-label">
                LEARN DATA ANALYTICS
              </span>

              <h2>
                Start Learning Data Analytics
                <span> For Free.</span>
              </h2>

              <p>
                Learn Excel, SQL, Python, Pandas, Statistics, Power BI,
                Data Visualization, and more through structured
                beginner-friendly materials.
              </p>

            </div>

            <Link
              to="/free-notes"
              className="btn btn-primary"
            >
              Start Learning →
            </Link>

          </div>

        </div>

      </section>


      {/* ROADMAP PREVIEW */}

      <section className="section roadmap-preview">

        <div className="container">

          <div className="section-heading">

            <span className="section-label">
              LEARNING ROADMAP
            </span>

            <h2>
              Your Journey From Beginner
              <span> To Data Analyst</span>
            </h2>

            <p>
              Follow a structured learning path and build your skills one
              step at a time.
            </p>

          </div>


          <div className="roadmap-preview-grid">

            <div className="roadmap-mini-card">

              <span className="roadmap-stage">
                01
              </span>

              <h3>
                Beginner
              </h3>

              <p>
                Excel → SQL → Python
              </p>

            </div>


            <div className="roadmap-mini-card">

              <span className="roadmap-stage">
                02
              </span>

              <h3>
                Intermediate
              </h3>

              <p>
                Pandas → Cleaning → Statistics → Visualization
              </p>

            </div>


            <div className="roadmap-mini-card">

              <span className="roadmap-stage">
                03
              </span>

              <h3>
                Advanced
              </h3>

              <p>
                Power BI → Projects → Portfolio → Interviews
              </p>

            </div>

          </div>


          <div className="center-button">

            <Link
              to="/roadmap"
              className="btn btn-secondary"
            >
              View Full Roadmap →
            </Link>

          </div>

        </div>

      </section>


      {/* PROJECTS PREVIEW */}

      <section className="section projects-preview">

        <div className="container">

          <div className="section-heading section-heading-row">

            <div>

              <span className="section-label">
                PRACTICAL PROJECTS
              </span>

              <h2>
                Learn By Building
                <span> Real Projects</span>
              </h2>

              <p>
                Practice your data analytics skills with practical projects
                covering dashboards, analysis, and machine learning.
              </p>

            </div>

            <Link
              to="/projects"
              className="text-link"
            >
              View Projects →
            </Link>

          </div>


          <div className="project-preview-grid">

            <div className="project-mini-card">
              <span>📊</span>
              <h3>Sales Dashboard</h3>
              <p>Power BI</p>
            </div>

            <div className="project-mini-card">
              <span>👥</span>
              <h3>Customer Churn</h3>
              <p>Python + ML</p>
            </div>

            <div className="project-mini-card">
              <span>🏢</span>
              <h3>HR Analytics</h3>
              <p>Power BI + Excel</p>
            </div>

            <div className="project-mini-card">
              <span>🛒</span>
              <h3>E-commerce Analytics</h3>
              <p>SQL + Power BI</p>
            </div>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="section final-cta-section">

        <div className="container">

          <div className="final-cta">

            <div>

              <span className="section-label">
                GET STARTED
              </span>

              <h2>
                Ready To Make Better
                <span> Decisions With Data?</span>
              </h2>

              <p>
                Start learning for free or explore professional analytics
                services from DataVista.
              </p>

            </div>


            <div className="cta-buttons">

              <Link
                to="/free-notes"
                className="btn btn-primary"
              >
                Start Learning
              </Link>

              <Link
                to="/contact"
                className="btn btn-secondary"
              >
                Contact DataVista
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}


/* =========================================================
   SERVICES PAGE
========================================================= */

function Services() {

  const services = [
    {
      icon: '📊',
      title: 'Data Analytics',
      description:
        'Analyze datasets to identify trends, patterns, performance indicators, and useful business insights.',
    },
    {
      icon: '🧹',
      title: 'Data Cleaning',
      description:
        'Clean missing values, duplicates, inconsistent formats, and unwanted data to prepare reliable datasets.',
    },
    {
      icon: '📑',
      title: 'Power BI Dashboard Development',
      description:
        'Create interactive Power BI dashboards that help businesses monitor performance and understand their data.',
    },
    {
      icon: '📈',
      title: 'Data Visualization',
      description:
        'Transform complex datasets into understandable charts, reports, dashboards, and visual stories.',
    },
    {
      icon: '🗃️',
      title: 'SQL Data Analysis',
      description:
        'Use SQL queries to extract, filter, join, aggregate, and analyze structured business data.',
    },
    {
      icon: '📗',
      title: 'Excel Data Analysis',
      description:
        'Analyze and organize business data using Excel formulas, PivotTables, charts, and dashboards.',
    },
    {
      icon: '🐍',
      title: 'Python Data Analysis',
      description:
        'Use Python and libraries such as Pandas and NumPy to clean, analyze, and explore datasets.',
    },
    {
      icon: '🤖',
      title: 'Machine Learning',
      description:
        'Build useful predictive models using machine learning techniques for data-driven applications.',
    },
    {
      icon: '💡',
      title: 'Business Insights',
      description:
        'Convert analytical results into clear findings and actionable insights that support better decisions.',
    },
  ]

  return (

    <div className="page services-page">

      <section className="page-hero">

        <div className="container">

          <span className="section-label">
            DATAVISTA SERVICES
          </span>

          <h1>
            Powerful Data Solutions
            <span> For Your Business</span>
          </h1>

          <p>
            From data cleaning to advanced analytics and dashboards,
            DataVista helps turn raw information into useful insights.
          </p>

        </div>

      </section>


      <section className="section">

        <div className="container">

          <div className="services-full-grid">

            {services.map((service, index) => (

              <div
                className="service-full-card"
                key={index}
              >

                <div className="service-full-icon">
                  {service.icon}
                </div>

                <h2>
                  {service.title}
                </h2>

                <p>
                  {service.description}
                </p>

                <Link
                  to="/contact"
                  className="service-full-link"
                >
                  Request This Service →
                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>


      <section className="section service-cta-section">

        <div className="container">

          <div className="service-cta">

            <div>

              <span className="section-label">
                HAVE A PROJECT?
              </span>

              <h2>
                Let's Work With
                <span> Your Data</span>
              </h2>

              <p>
                Tell us about your requirement and we can understand how
                DataVista can help.
              </p>

            </div>

            <Link
              to="/contact"
              className="btn btn-primary"
            >
              Submit Requirement →
            </Link>

          </div>

        </div>

      </section>

    </div>
  )
}


/* =========================================================
   FREE NOTES PAGE
========================================================= */

function FreeNotes() {

  const notes = [
    {
      icon: '📊',
      title: 'Data Analytics',
      description:
        'Access Data Analytics learning materials uploaded by DataVista.',
      level: 'Beginner',
      link: '/notes/data-analytics',
    },
    {
      icon: '🐍',
      title: 'Python for Data Analytics',
      description:
        'Access Python learning materials for data analysis.',
      level: 'Beginner',
      link: '/notes/python-data-analytics',
    },
    {
      icon: '🐼',
      title: 'Pandas',
      description:
        'Access Pandas learning materials for data manipulation and analysis.',
      level: 'Beginner',
      link: '/notes/pandas',
    },
    {
      icon: '🗃️',
      title: 'SQL',
      description:
        'Access SQL learning materials from fundamentals to advanced analysis.',
      level: 'Beginner',
      link: '/notes/sql',
    },
    {
      icon: '📗',
      title: 'Excel',
      description:
        'Access Excel learning materials for formulas, analysis and dashboards.',
      level: 'Beginner',
      link: '/notes/excel',
    },
    {
      icon: '📐',
      title: 'Statistics',
      description:
        'Access statistics learning materials for data analytics.',
      level: 'Beginner',
      link: '/notes/statistics',
    },
    {
      icon: '📊',
      title: 'Power BI',
      description:
        'Access Power BI learning materials for dashboards and reporting.',
      level: 'Intermediate',
      link: '/notes/power-bi',
    },
    {
      icon: '📈',
      title: 'Data Visualization',
      description:
        'Access learning materials about charts, dashboards and data storytelling.',
      level: 'Beginner',
      link: '/notes/data-visualization',
    },
    {
      icon: '💼',
      title: 'Data Analyst Interview Questions',
      description:
        'Access interview preparation materials for data analyst roles.',
      level: 'All Levels',
      link: '/notes/data-analyst-interview-questions',
    },
  ]

  return (

    <div className="page free-notes-page">

      <section className="page-hero">

        <div className="container">

          <span className="section-label">
            FREE LEARNING
          </span>

          <h1>
            Learn Data Analytics
            <span> Step By Step</span>
          </h1>

          <p>
            Access free learning materials uploaded by DataVista.
            Materials may include PDFs, Word documents, Excel files,
            PowerPoint presentations, CSV files, text files, and other
            supported learning resources.
          </p>

        </div>

      </section>


      <section className="notes-statistics">

        <div className="container">

          <div className="notes-stats-grid">

            <div className="notes-stat-card">

              <div className="notes-stat-icon">
                📚
              </div>

              <div>
                <strong>Free</strong>
                <span>Learning Resources</span>
              </div>

            </div>


            <div className="notes-stat-card">

              <div className="notes-stat-icon">
                📊
              </div>

              <div>
                <strong>9+</strong>
                <span>Data Analytics Topics</span>
              </div>

            </div>


            <div className="notes-stat-card">

              <div className="notes-stat-icon">
                📁
              </div>

              <div>
                <strong>Multiple</strong>
                <span>Material Formats</span>
              </div>

            </div>


            <div className="notes-stat-card">

              <div className="notes-stat-icon">
                🎓
              </div>

              <div>
                <strong>100%</strong>
                <span>Free Access</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      <section className="section">

        <div className="container">

          <div className="notes-grid">

            {notes.map((note, index) => (

              <div
                className="note-card"
                key={index}
              >

                <div className="note-card-top">

                  <div className="note-icon">
                    {note.icon}
                  </div>

                  <span className="note-level">
                    {note.level}
                  </span>

                </div>

                <h2>
                  {note.title}
                </h2>

                <p>
                  {note.description}
                </p>

                <div className="note-meta">

                  <span>
                    📁 Learning Materials
                  </span>

                </div>

                <Link
                  to={note.link}
                  className="note-read-link"
                >
                  View Materials →
                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>


      <section className="section">

        <div className="container">

          <div className="notes-roadmap-box">

            <div>

              <span className="section-label">
                NOT SURE WHERE TO START?
              </span>

              <h2>
                Follow The Data Analyst
                <span> Roadmap</span>
              </h2>

              <p>
                Start with the fundamentals and gradually build the skills
                required for a data analyst career.
              </p>

            </div>

            <Link
              to="/roadmap"
              className="btn btn-primary"
            >
              View Roadmap →
            </Link>

          </div>

        </div>

      </section>

    </div>
  )
}


/* =========================================================
   FILE TYPE HELPERS
========================================================= */

function getFileExtension(fileName = '') {

  const parts = fileName.split('.')

  if (parts.length < 2) {
    return ''
  }

  return parts.pop().toLowerCase()
}


function getFileIcon(extension) {

  const icons = {
    pdf: '📕',
    doc: '📝',
    docx: '📝',
    xls: '📗',
    xlsx: '📗',
    csv: '📊',
    ppt: '📑',
    pptx: '📑',
    txt: '📄',
    md: '📄',
    json: '🔧',
    zip: '🗜️',
    rar: '🗜️',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    webp: '🖼️',
  }

  return icons[extension] || '📁'
}


function getFileTypeName(extension) {

  const names = {
    pdf: 'PDF Document',
    doc: 'Word Document',
    docx: 'Word Document',
    xls: 'Excel Spreadsheet',
    xlsx: 'Excel Spreadsheet',
    csv: 'CSV File',
    ppt: 'PowerPoint Presentation',
    pptx: 'PowerPoint Presentation',
    txt: 'Text Document',
    md: 'Markdown Document',
    json: 'JSON File',
    zip: 'ZIP Archive',
    rar: 'RAR Archive',
    jpg: 'Image',
    jpeg: 'Image',
    png: 'Image',
    webp: 'Image',
  }

  return names[extension] || 'Learning Material'
}


function isPdfFile(fileName) {

  return getFileExtension(fileName) === 'pdf'
}


function isImageFile(fileName) {

  const extension = getFileExtension(fileName)

  return [
    'jpg',
    'jpeg',
    'png',
    'webp',
  ].includes(extension)
}


/* =========================================================
   DATA ANALYTICS NOTES
   MATERIAL COMES ONLY FROM ADMIN UPLOAD
========================================================= */

function DataAnalyticsNotes() {

  return (
    <NotePage
      icon="📊"
      title="Data Analytics"
      topic="Data Analytics"
      description="Access DataVista learning materials for Data Analytics. Materials uploaded by the administrator will appear here."
      nextLink="/notes/python-data-analytics"
      nextTitle="Next: Python for Data Analytics"
    />
  )
}


/* =========================================================
   GENERIC NOTE PAGE
   CONNECTED TO BACKEND
========================================================= */

function NotePage({
  icon,
  title,
  description,
  topic,
  nextLink,
  nextTitle,
}) {

  const { slug } = useParams()

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  useEffect(() => {

    const fetchNotes = async () => {

      try {

        setLoading(true)
        setError('')

        const response = await fetch(
          `${API_BASE_URL}/api/notes?topic=${encodeURIComponent(topic)}`
        )

        if (!response.ok) {

          throw new Error(
            'Failed to fetch learning material'
          )

        }

        const data = await response.json()

        if (data.success) {

          setNotes(
            data.notes || []
          )

        } else {

          setError(
            data.message ||
            'Failed to load learning material'
          )

        }

      } catch (error) {

        console.error(
          'Fetch notes error:',
          error
        )

        setError(
          'Unable to load learning material. Please try again.'
        )

      } finally {

        setLoading(false)

      }

    }

    fetchNotes()

  }, [topic, slug])


  return (

    <div className="page note-placeholder-page">

      {/* PAGE HERO */}

      <section className="page-hero">

        <div className="container">

          <Link
            to="/free-notes"
            className="back-link"
          >
            ← Back to Free Notes
          </Link>


          <div className="placeholder-icon">
            {icon}
          </div>


          <span className="section-label">
            DATAVISTA FREE NOTES
          </span>


          <h1>
            {title}
          </h1>


          <p>
            {description}
          </p>

        </div>

      </section>


      {/* MATERIAL CONTENT */}

      <section className="section">

        <div className="container">


          {/* LOADING */}

          {loading && (

            <div className="coming-soon-card">

              <span>
                ⏳
              </span>

              <h2>
                Loading Learning Material...
              </h2>

              <p>
                Please wait while we load the available
                DataVista materials.
              </p>

            </div>

          )}


          {/* ERROR */}

          {!loading && error && (

            <div className="coming-soon-card">

              <span>
                ⚠️
              </span>

              <h2>
                Unable to Load Materials
              </h2>

              <p>
                {error}
              </p>

              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Try Again
              </button>

            </div>

          )}


          {/* NO MATERIAL */}

          {!loading &&
            !error &&
            notes.length === 0 && (

              <div className="coming-soon-card">

                <span>
                  📚
                </span>

                <h2>
                  Material Not Uploaded Yet
                </h2>

                <p>
                  DataVista has not uploaded learning
                  material for {title} yet.
                </p>

                <Link
                  to="/free-notes"
                  className="btn btn-primary"
                >
                  ← Back to Free Notes
                </Link>

              </div>

            )}


          {/* AVAILABLE MATERIALS */}

          {!loading &&
            !error &&
            notes.length > 0 && (

              <div
                style={{
                  display: 'grid',
                  gap: '30px',
                }}
              >

                {notes.map((note) => {

                  const fileUrl =
                    `${API_BASE_URL}${note.filePath}`

                  const extension =
                    getFileExtension(note.originalName)

                  const fileIcon =
                    getFileIcon(extension)

                  const fileType =
                    getFileTypeName(extension)

                  const isPdf =
                    isPdfFile(note.originalName)

                  const isImage =
                    isImageFile(note.originalName)


                  return (

                    <article
                      key={note._id}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow:
                          '0 4px 15px rgba(15, 23, 42, 0.05)',
                      }}
                    >

                      {/* MATERIAL INFORMATION */}

                      <div
                        style={{
                          padding: '25px',
                        }}
                      >

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            marginBottom: '15px',
                            flexWrap: 'wrap',
                          }}
                        >

                          <span
                            style={{
                              fontSize: '38px',
                            }}
                          >
                            {fileIcon}
                          </span>


                          <div>

                            <span
                              style={{
                                display: 'inline-block',
                                backgroundColor: '#dbeafe',
                                color: '#1d4ed8',
                                padding: '6px 12px',
                                borderRadius: '999px',
                                fontSize: '12px',
                                fontWeight: '700',
                                marginBottom: '8px',
                              }}
                            >
                              {note.topic}
                            </span>

                            <div
                              style={{
                                color: '#64748b',
                                fontSize: '13px',
                              }}
                            >
                              {fileType}
                            </div>

                          </div>

                        </div>


                        <h2
                          style={{
                            margin: '0 0 10px',
                            fontSize: '26px',
                            color: '#0f172a',
                          }}
                        >
                          {note.title}
                        </h2>


                        {note.description && (

                          <p
                            style={{
                              margin: '0 0 12px',
                              color: '#64748b',
                              lineHeight: '1.6',
                            }}
                          >
                            {note.description}
                          </p>

                        )}


                        <p
                          style={{
                            margin: '0 0 20px',
                            color: '#64748b',
                            fontSize: '13px',
                            wordBreak: 'break-word',
                          }}
                        >
                          {fileIcon} {note.originalName}
                        </p>


                        {/* BUTTONS */}

                        <div
                          style={{
                            display: 'flex',
                            gap: '12px',
                            flexWrap: 'wrap',
                          }}
                        >

                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{
                              display: 'inline-block',
                              textDecoration: 'none',
                            }}
                          >
                            {isPdf
                              ? '📖 Open PDF'
                              : isImage
                                ? '🖼️ Open Image'
                                : '📂 Open Material'
                            }
                          </a>


                          <a
                            href={fileUrl}
                            download={note.originalName}
                            className="btn btn-secondary"
                            style={{
                              display: 'inline-block',
                              textDecoration: 'none',
                            }}
                          >
                            ⬇ Download
                          </a>

                        </div>

                      </div>


                      {/* PDF PREVIEW */}

                      {isPdf && (

                        <div
                          style={{
                            backgroundColor: '#e2e8f0',
                            padding: '15px',
                          }}
                        >

                          <iframe
                            src={fileUrl}
                            title={note.title}
                            style={{
                              width: '100%',
                              height: '700px',
                              border: '1px solid #cbd5e1',
                              borderRadius: '10px',
                              backgroundColor: '#ffffff',
                            }}
                          />

                        </div>

                      )}


                      {/* IMAGE PREVIEW */}

                      {isImage && (

                        <div
                          style={{
                            backgroundColor: '#f8fafc',
                            padding: '20px',
                            textAlign: 'center',
                          }}
                        >

                          <img
                            src={fileUrl}
                            alt={note.title}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '700px',
                              borderRadius: '10px',
                              objectFit: 'contain',
                            }}
                          />

                        </div>

                      )}

                    </article>

                  )

                })}

              </div>

            )}


          {/* NEXT TOPIC */}

          {!loading &&
            !error &&
            notes.length > 0 &&
            nextLink && (

              <div
                style={{
                  marginTop: '35px',
                  textAlign: 'center',
                }}
              >

                <Link
                  to={nextLink}
                  className="btn btn-secondary"
                >
                  {nextTitle || 'Next Topic'} →
                </Link>

              </div>

            )}

        </div>

      </section>

    </div>
  )
}


/* =========================================================
   ROADMAP PAGE
========================================================= */

function Roadmap() {

  const stages = [
    {
      number: '01',
      title: 'Beginner',
      subtitle: 'Build Your Foundation',
      topics: [
        'Excel Fundamentals',
        'SQL Basics',
        'Python Fundamentals',
      ],
    },
    {
      number: '02',
      title: 'Intermediate',
      subtitle: 'Build Analytical Skills',
      topics: [
        'Pandas',
        'Data Cleaning',
        'Statistics',
        'Data Visualization',
      ],
    },
    {
      number: '03',
      title: 'Advanced',
      subtitle: 'Become Job Ready',
      topics: [
        'Power BI',
        'Real-World Projects',
        'Portfolio Building',
        'Interview Preparation',
        'AI for Data Analytics',
      ],
    },
  ]

  return (

    <div className="page roadmap-page">

      <section className="page-hero">

        <div className="container">

          <span className="section-label">
            DATA ANALYST ROADMAP
          </span>

          <h1>
            Your Journey From Beginner
            <span> To Data Analyst</span>
          </h1>

          <p>
            Follow a structured path and build the skills needed to work
            confidently with data.
          </p>

        </div>

      </section>


      <section className="section">

        <div className="container">

          <div className="roadmap-stages">

            {stages.map((stage) => (

              <div
                className="roadmap-stage-card"
                key={stage.number}
              >

                <div className="roadmap-stage-header">

                  <span className="roadmap-number">
                    {stage.number}
                  </span>

                  <div>

                    <h2>
                      {stage.title}
                    </h2>

                    <p>
                      {stage.subtitle}
                    </p>

                  </div>

                </div>


                <div className="roadmap-topics">

                  {stage.topics.map((topic, index) => (

                    <div
                      className="roadmap-topic"
                      key={index}
                    >

                      <span>
                        ✓
                      </span>

                      {topic}

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>


          <div className="roadmap-cta">

            <div>

              <span className="section-label">
                START TODAY
              </span>

              <h2>
                Learn One Skill
                <span> At A Time.</span>
              </h2>

              <p>
                You don't need to learn everything at once. Follow the path,
                practice consistently, and build projects along the way.
              </p>

            </div>

            <Link
              to="/free-notes"
              className="btn btn-primary"
            >
              Explore Free Notes →
            </Link>

          </div>

        </div>

      </section>

    </div>
  )
}


/* =========================================================
   PROJECTS PAGE
========================================================= */

function Projects() {

  const projects = [
    {
      icon: '📊',
      title: 'Sales Dashboard',
      tools: 'Power BI',
      level: 'Beginner',
      description:
        'Build an interactive sales dashboard to analyze revenue, products, regions, and sales performance.',
    },
    {
      icon: '👥',
      title: 'Customer Churn Analysis',
      tools: 'Python + ML',
      level: 'Intermediate',
      description:
        'Analyze customer behavior and build a machine learning model to predict customer churn.',
    },
    {
      icon: '🏢',
      title: 'HR Analytics',
      tools: 'Power BI + Excel',
      level: 'Intermediate',
      description:
        'Analyze employee data to understand workforce trends, attrition, and department performance.',
    },
    {
      icon: '🎓',
      title: 'Student Performance',
      tools: 'Python + Pandas',
      level: 'Beginner',
      description:
        'Analyze student performance data and identify factors affecting academic results.',
    },
    {
      icon: '🛒',
      title: 'E-commerce Analytics',
      tools: 'SQL + Power BI',
      level: 'Intermediate',
      description:
        'Analyze e-commerce transactions, customer behavior, products, and sales performance.',
    },
    {
      icon: '🏥',
      title: 'Healthcare Analytics',
      tools: 'Python + Visualization',
      level: 'Advanced',
      description:
        'Explore healthcare datasets and communicate important patterns using data visualization.',
    },
    {
      icon: '🏠',
      title: 'House Price Prediction',
      tools: 'Machine Learning',
      level: 'Advanced',
      description:
        'Build a machine learning regression model to predict house prices from property features.',
    },
  ]

  return (

    <div className="page projects-page">

      <section className="page-hero">

        <div className="container">

          <span className="section-label">
            PRACTICAL PROJECTS
          </span>

          <h1>
            Learn By Building
            <span> Real Projects</span>
          </h1>

          <p>
            Apply your data analytics skills to practical projects and
            create portfolio-ready work.
          </p>

        </div>

      </section>


      <section className="section">

        <div className="container">

          <div className="projects-grid">

            {projects.map((project, index) => (

              <div
                className="project-card"
                key={index}
              >

                <div className="project-card-top">

                  <div className="project-icon">
                    {project.icon}
                  </div>

                  <span className="project-level">
                    {project.level}
                  </span>

                </div>

                <h2>
                  {project.title}
                </h2>

                <span className="project-tools">
                  {project.tools}
                </span>

                <p>
                  {project.description}
                </p>

                <Link
                  to="/free-notes"
                  className="project-link"
                >
                  Learn & Build →
                </Link>

              </div>

            ))}

          </div>


          <div className="projects-cta">

            <div>

              <span className="section-label">
                BUILD YOUR PORTFOLIO
              </span>

              <h2>
                Turn Your Skills Into
                <span> Real Projects</span>
              </h2>

              <p>
                Projects are one of the best ways to demonstrate your
                practical data analytics skills.
              </p>

            </div>

            <Link
              to="/roadmap"
              className="btn btn-primary"
            >
              Follow Roadmap →
            </Link>

          </div>

        </div>

      </section>

    </div>
  )
}


/* =========================================================
   ABOUT PAGE
========================================================= */

function About() {

  return (

    <div className="page about-page">

      <section className="page-hero">

        <div className="container">

          <span className="section-label">
            ABOUT DATAVISTA
          </span>

          <h1>
            Making Data Easier To Understand
            <span> And Easier To Use</span>
          </h1>

          <p>
            DataVista is focused on helping students, beginners, and
            businesses learn, understand, analyze, and use data effectively.
          </p>

        </div>

      </section>


      <section className="section">

        <div className="container about-content">

          <div className="about-card">

            <span className="about-icon">
              🎯
            </span>

            <span className="section-label">
              OUR MISSION
            </span>

            <h2>
              Make data easier to understand
              <span> and easier to use.</span>
            </h2>

            <p>
              Data can often look complicated when it is presented without
              context. DataVista aims to make data analytics easier to learn
              through structured educational content and practical examples.
            </p>

          </div>


          <div className="about-card">

            <span className="about-icon">
              🚀
            </span>

            <span className="section-label">
              OUR VISION
            </span>

            <h2>
              Help people and businesses
              <span> make better decisions through data.</span>
            </h2>

            <p>
              We want to create a practical learning and analytics platform
              where people can develop useful data skills and businesses can
              explore data-driven solutions.
            </p>

          </div>

        </div>

      </section>


      <section className="section about-values-section">

        <div className="container">

          <div className="section-heading">

            <span className="section-label">
              WHAT DATAVISTA FOCUSES ON
            </span>

            <h2>
              Learn. Analyze.
              <span> Improve.</span>
            </h2>

          </div>


          <div className="about-values-grid">

            <div className="about-value">

              <span>
                📚
              </span>

              <h3>
                Learn
              </h3>

              <p>
                Structured learning resources for data analytics beginners.
              </p>

            </div>


            <div className="about-value">

              <span>
                📊
              </span>

              <h3>
                Analyze
              </h3>

              <p>
                Practical approaches for understanding and working with data.
              </p>

            </div>


            <div className="about-value">

              <span>
                💡
              </span>

              <h3>
                Improve
              </h3>

              <p>
                Turn analytical findings into useful and actionable insights.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}


/* =========================================================
   CONTACT PAGE
========================================================= */

function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)


  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))

  }


  const handleSubmit = async (event) => {

    event.preventDefault()

    if (loading) {
      return
    }


    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.service ||
      !formData.description.trim()
    ) {

      alert(
        'Please fill all required fields.'
      )

      return
    }


    setLoading(true)


    try {

      const response = await fetch(
        `${API_BASE_URL}/api/service-requests`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            company: formData.company.trim(),
            service: formData.service,
            description: formData.description.trim(),
          }),
        }
      )


      const data = await response.json()


      if (!response.ok) {

        throw new Error(
          data.message ||
          'Failed to submit requirement'
        )

      }


      alert(
        'Thank you! Your requirement has been submitted successfully.'
      )


      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        description: '',
      })


    } catch (error) {

      console.error(
        'Service request error:',
        error
      )


      alert(
        error.message ||
        'Failed to submit your requirement. Please try again.'
      )

    } finally {

      setLoading(false)

    }

  }


  return (

    <div className="page contact-page">

      <section className="page-hero">

        <div className="container">

          <span className="section-label">
            CONTACT DATAVISTA
          </span>

          <h1>
            Let's Talk About
            <span> Your Data</span>
          </h1>

          <p>
            Have a data analytics requirement or want to know more about
            DataVista? Send your requirement and get in touch.
          </p>

        </div>

      </section>


      <section className="section">

        <div className="container contact-grid">

          <div className="contact-info">

            <span className="section-label">
              GET IN TOUCH
            </span>

            <h2>
              Tell Us What
              <span> You Need</span>
            </h2>

            <p>
              Whether you need data cleaning, Power BI dashboards,
              analytics, visualization, SQL analysis, or another
              data solution, you can contact DataVista.
            </p>


            <div className="contact-info-card">

              <span>
                ✉️
              </span>

              <div>

                <small>
                  Email
                </small>

                <strong>
                  datavista.analytic@gmail.com
                </strong>

              </div>

            </div>


            <div className="contact-info-card">

              <span>
                📊
              </span>

              <div>

                <small>
                  Services
                </small>

                <strong>
                  Analytics • Visualization • Power BI
                </strong>

              </div>

            </div>


            <div className="contact-info-card">

              <span>
                🚀
              </span>

              <div>

                <small>
                  What Happens Next?
                </small>

                <strong>
                  We review your requirement and contact you.
                </strong>

              </div>

            </div>

          </div>


          <div className="contact-form-card">

            <h2>
              Project Requirement
            </h2>

            <p>
              Tell us about your project requirement.
            </p>


            <form onSubmit={handleSubmit}>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Email *
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label>
                    Phone *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Company / Organization
                  </label>

                  <input
                    type="text"
                    name="company"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Service Required *
                </label>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >

                  <option
                    value=""
                    disabled
                  >
                    Select a service
                  </option>

                  <option value="Data Analytics">
                    Data Analytics
                  </option>

                  <option value="Data Cleaning">
                    Data Cleaning
                  </option>

                  <option value="Power BI Dashboard Development">
                    Power BI Dashboard Development
                  </option>

                  <option value="Data Visualization">
                    Data Visualization
                  </option>

                  <option value="SQL Data Analysis">
                    SQL Data Analysis
                  </option>

                  <option value="Excel Data Analysis">
                    Excel Data Analysis
                  </option>

                  <option value="Python Data Analysis">
                    Python Data Analysis
                  </option>

                  <option value="Machine Learning">
                    Machine Learning
                  </option>

                  <option value="Business Insights">
                    Business Insights
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Project Description *
                </label>

                <textarea
                  name="description"
                  rows="6"
                  placeholder="Describe your requirement..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>

              </div>


              <button
                type="submit"
                className="btn btn-primary form-submit"
                disabled={loading}
              >

                {loading
                  ? 'Submitting...'
                  : 'Submit Requirement →'
                }

              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  )
}


/* =========================================================
   FOOTER
========================================================= */

function Footer() {

  return (

    <footer className="footer">

      <div className="container footer-grid">

        <div className="footer-brand">

          <Link
            to="/"
            className="footer-logo"
          >
            Data<span>Vista</span>
          </Link>

          <p>
            See Your Data. Make Better Decisions.
          </p>

          <p className="footer-description">
            Learn data analytics, explore practical projects, and discover
            professional data solutions.
          </p>

        </div>


        <div className="footer-column">

          <h3>
            Company
          </h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/services">
            Services
          </Link>

          <Link to="/projects">
            Projects
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>


        <div className="footer-column">

          <h3>
            Learning
          </h3>

          <Link to="/free-notes">
            Free Notes
          </Link>

          <Link to="/roadmap">
            Roadmap
          </Link>

          <Link to="/notes/data-analytics">
            Data Analytics
          </Link>

          <Link to="/notes/python-data-analytics">
            Python
          </Link>

          <Link to="/notes/pandas">
            Pandas
          </Link>

          <Link to="/notes/sql">
            SQL
          </Link>

          <Link to="/notes/excel">
            Excel
          </Link>

        </div>


        <div className="footer-column">

          <h3>
            More Topics
          </h3>

          <Link to="/notes/statistics">
            Statistics
          </Link>

          <Link to="/notes/power-bi">
            Power BI
          </Link>

          <Link to="/notes/data-visualization">
            Data Visualization
          </Link>

          <Link to="/notes/data-analyst-interview-questions">
            Interview Questions
          </Link>

          <Link to="/projects">
            Practical Projects
          </Link>

        </div>


        <div className="footer-column">

          <h3>
            Services
          </h3>

          <Link to="/services">
            Data Analytics
          </Link>

          <Link to="/services">
            Data Cleaning
          </Link>

          <Link to="/services">
            Power BI
          </Link>

          <Link to="/services">
            Data Visualization
          </Link>

          <Link to="/services">
            Machine Learning
          </Link>

        </div>

      </div>


      <div className="container footer-bottom">

        <span>
          © {new Date().getFullYear()} DataVista. All rights reserved.
        </span>

        <span>
          See Your Data. Make Better Decisions.
        </span>

      </div>

    </footer>
  )
}


/* =========================================================
   APP ROUTER
========================================================= */

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <main>

        <Routes>

          {/* MAIN PAGES */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/free-notes"
            element={<FreeNotes />}
          />

          <Route
            path="/roadmap"
            element={<Roadmap />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />


          {/* ADMIN */}

          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin-upload"
            element={<AdminUpload />}
          />


          {/* DATA ANALYTICS */}

          <Route
            path="/notes/data-analytics"
            element={<DataAnalyticsNotes />}
          />


          {/* PYTHON */}

          <Route
            path="/notes/python-data-analytics"
            element={
              <NotePage
                icon="🐍"
                title="Python for Data Analytics"
                topic="Python for Data Analytics"
                description="Access Python learning materials for data analysis."
                nextLink="/notes/pandas"
                nextTitle="Next: Pandas"
              />
            }
          />


          {/* PANDAS */}

          <Route
            path="/notes/pandas"
            element={
              <NotePage
                icon="🐼"
                title="Pandas"
                topic="Pandas"
                description="Access Pandas learning materials for data manipulation and analysis."
                nextLink="/notes/sql"
                nextTitle="Next: SQL"
              />
            }
          />


          {/* SQL */}

          <Route
            path="/notes/sql"
            element={
              <NotePage
                icon="🗃️"
                title="SQL"
                topic="SQL"
                description="Access SQL learning materials from fundamentals to advanced data analysis."
                nextLink="/notes/excel"
                nextTitle="Next: Excel"
              />
            }
          />


          {/* EXCEL */}

          <Route
            path="/notes/excel"
            element={
              <NotePage
                icon="📗"
                title="Excel for Data Analytics"
                topic="Excel"
                description="Access Excel learning materials for formulas, functions, PivotTables, charts, cleaning, and analysis."
                nextLink="/notes/statistics"
                nextTitle="Next: Statistics"
              />
            }
          />


          {/* STATISTICS */}

          <Route
            path="/notes/statistics"
            element={
              <NotePage
                icon="📐"
                title="Statistics for Data Analytics"
                topic="Statistics"
                description="Access statistics learning materials for data analytics."
                nextLink="/notes/power-bi"
                nextTitle="Next: Power BI"
              />
            }
          />


          {/* POWER BI */}

          <Route
            path="/notes/power-bi"
            element={
              <NotePage
                icon="📊"
                title="Power BI"
                topic="Power BI"
                description="Access Power BI learning materials for dashboards and reporting."
                nextLink="/notes/data-visualization"
                nextTitle="Next: Data Visualization"
              />
            }
          />


          {/* DATA VISUALIZATION */}

          <Route
            path="/notes/data-visualization"
            element={
              <NotePage
                icon="📈"
                title="Data Visualization"
                topic="Data Visualization"
                description="Access learning materials about charts, dashboards, and data storytelling."
                nextLink="/notes/data-analyst-interview-questions"
                nextTitle="Next: Interview Questions"
              />
            }
          />


          {/* INTERVIEW QUESTIONS */}

          <Route
            path="/notes/data-analyst-interview-questions"
            element={
              <NotePage
                icon="💼"
                title="Data Analyst Interview Questions"
                topic="Data Analyst Interview Questions"
                description="Access interview preparation materials for data analyst roles."
                nextLink="/free-notes"
                nextTitle="All Free Notes"
              />
            }
          />


          {/* 404 */}

          <Route
            path="*"
            element={

              <div className="not-found-page">

                <div className="not-found-content">

                  <span>
                    404
                  </span>

                  <h1>
                    Page Not Found
                  </h1>

                  <p>
                    The page you are looking for does not exist.
                  </p>

                  <Link
                    to="/"
                    className="btn btn-primary"
                  >
                    Back to Home →
                  </Link>

                </div>

              </div>

            }
          />

        </Routes>

      </main>


      <Footer />

    </BrowserRouter>
  )
}


export default App