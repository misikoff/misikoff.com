import Header from 'components/header'

export default function Highlight({ children, color }: any) {
  return (
    <>
      <span
        style={{
          backgroundColor: color,
          borderRadius: '2px',
          color: '#fff',
          padding: '0.2rem',
        }}
      >
        {children}
      </span>
      <Header title='wow' />
    </>
  )
}
